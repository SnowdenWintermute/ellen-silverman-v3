import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { uploadPaintingCSVFormData } from '../../apiCalls/paintings'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddedPaintingsResultsAccordion from './AddedPaintingsResultsAccordion';
import StandardModal from '../common/modal/StandardModal'
import FileInput from '../forms/FileInput'
import { toast } from "react-toastify"
import { makeStyles } from '@material-ui/core/styles'
import MaterialPaperNarrow from '../layout/MaterialPaperNarrow'
import AdminFeatureHeader from './subComponents/AdminFeatureHeader'

const useStyles = makeStyles((theme) => ({
  showResultsButton: {
    marginTop: "10px",
    width: "100%"
  }
}));

const AddPaintingsFromCSV = () => {
  const [formData, setFormData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [paintingsAdded, setPaintingsAdded] = useState([])
  const [paintingsUpdated, setPaintingsUpdated] = useState([])
  const [errors, setErrors] = useState([])
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.user);

  const classes = useStyles()

  useEffect(() => {
    setFormData(new FormData())
  }, []);

  const handleChange = e => {
    if (formData) formData.set("csv", e.target.files[0])
    setSelectedFile(e.target.files[0])
  };


  const handleProgressEvent = progressEvent => {
    setProgress(parseInt(Math.round(progressEvent.loaded * 100)) / progressEvent.total)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    uploadPaintingCSVFormData(formData, user.token, handleProgressEvent).then(res => {
      console.log({ ...res })
      if (res.response && res.response.data.error) {
        console.log("ey")
        toast.error(res.response.data.error.message)
      }
      res.data.paintingsAdded && setPaintingsAdded(res.data.paintingsAdded)
      res.data.paintingsUpdated && setPaintingsUpdated(res.data.paintingsUpdated)
      res.data.errors && setErrors(res.data.errors)
      setOpen(true)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  const handleClose = () => setOpen(false)

  return (
    <div className="page-frame">
      <MaterialPaperNarrow className={classes.paper}>
        <Grid container item xs={12}>
          <AdminFeatureHeader headerText={"Add and Update Paintings from CSV"} subHeaderText={"Any paintings in the selected .csv file will overwrite paintings on the database"} />
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              {(loading && progress !== 100) ? <LinearProgress variant="determinate" value={progress} /> : loading && <LinearProgress />}
              <FileInput handleChange={handleChange} selectedFile={selectedFile} />
              <Button style={{ height: "40px", cursor: "pointer", marginTop: "10px", width: "100%" }} disabled={loading || !selectedFile} variant="contained" color="primary" type="submit">SEND CSV</Button>
            </form>
            {(paintingsAdded.length > 0 || paintingsUpdated.length > 0 || errors.length > 0) && <Button className={classes.showResultsButton} variant="outlined" color="primary" onClick={() => setOpen(true)}>Show most recent edit results</Button>}
          </Grid>
        </Grid>
      </MaterialPaperNarrow>
      <StandardModal open={open} handleClose={handleClose}>
        <h2 id="simple-modal-title">Results</h2>
        <AddedPaintingsResultsAccordion paintingsAdded={paintingsAdded} paintingsUpdated={paintingsUpdated} errors={errors} />
        <Button variant="contained" color="primary" onClick={() => setOpen(false)} style={{ float: "right", width: "140px" }}>OK</Button>
      </StandardModal>
    </div>

  )
}
export default AddPaintingsFromCSV