import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Grid, LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from "react-toastify"
import { uploadPaintingCSVFormData } from '../../../apiCalls/paintings'
import MaterialPaperNarrow from '../../common/paper/MaterialPaperNarrow'
import PrimaryButton from '../../common/button/PrimaryButton'
import StandardDialog from '../../common/dialog/StandardDialog'
import AdminFeatureHeader from '../subComponents/AdminFeatureHeader'
import AddedPaintingsResultsAccordion from './AddedPaintingsResultsAccordion';
import FileInput from '../../forms/FileInput'

const useStyles = makeStyles(() => ({
  button: {
    marginTop: "10px"
  },
  showResultsButton: {
    marginTop: "10px",
    width: "100%"
  },
  okButton: {
    float: "right",
    width: "140px"
  }
}));

const AddPaintingsFromCSV = () => {
  const formData = useRef(new FormData())
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [paintingsAdded, setPaintingsAdded] = useState([])
  const [paintingsUpdated, setPaintingsUpdated] = useState([])
  const [errors, setErrors] = useState([])
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.user);

  const classes = useStyles()

  const handleChange = e => {
    if (formData.current) formData.current.set("csv", e.target.files[0])
    setSelectedFile(e.target.files[0])
  };

  const handleProgressEvent = progressEvent => setProgress(parseInt(Math.round(progressEvent.loaded * 100)) / progressEvent.total)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await uploadPaintingCSVFormData(formData.current, user.token, handleProgressEvent)
      if (res.response && res.response.data.error) toast.error(res.response.data.error.message)
      res.data.paintingsAdded && setPaintingsAdded(res.data.paintingsAdded)
      res.data.paintingsUpdated && setPaintingsUpdated(res.data.paintingsUpdated)
      res.data.errors && setErrors(res.data.errors)
      setOpen(true)
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
    }
    setLoading(false)
  }

  const handleClose = () => setOpen(false)

  return (
    <div className="page-frame">
      <MaterialPaperNarrow>
        <Grid container item xs={12}>
          <AdminFeatureHeader headerText={"Add and Update Paintings from CSV"} subHeaderText={"NOTE: Any paintings in the selected .csv file will overwrite paintings in the database"} />
          <Grid item xs={12}>
            {(loading && progress !== 100) ?
              <LinearProgress variant="determinate" value={progress} /> :
              loading && <LinearProgress />}
            <form onSubmit={handleSubmit}>
              <FileInput handleChange={handleChange} selectedFile={selectedFile} />
              <PrimaryButton
                title="SEND CSV"
                disabled={loading || !selectedFile}
                customClasses={classes.button}
                fullWidth
                isSubmit
              />
            </form>
            {(paintingsAdded.length > 0 || paintingsUpdated.length > 0 || errors.length > 0) &&
              <PrimaryButton
                title="Show most recent edit results"
                onClick={() => setOpen(true)}
                customClasses={classes.showResultsButton}
                outlined
              />}
          </Grid>
        </Grid>
      </MaterialPaperNarrow>
      <StandardDialog open={open} onClose={handleClose}>
        <h2 id="simple-modal-title">Results</h2>
        <AddedPaintingsResultsAccordion paintingsAdded={paintingsAdded} paintingsUpdated={paintingsUpdated} errors={errors} />
        <PrimaryButton
          title="OK"
          onClick={() => setOpen(false)}
          customClasses={classes.okButton}
        />
      </StandardDialog>
    </div>
  )
}
export default AddPaintingsFromCSV