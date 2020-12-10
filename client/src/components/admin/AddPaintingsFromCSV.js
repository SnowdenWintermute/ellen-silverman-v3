import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { uploadPaintingCSVFormData } from '../../apiCalls/paintings'
import AddedPaintingsResultsAccordion from './AddedPaintingsResultsAccordion';
import { toast } from "react-toastify"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `${10}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${0}%)`,
  },
}));

const AddPaintingsFromCSV = () => {
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [paintingsAdded, setPaintingsAdded] = useState([])
  const [paintingsUpdated, setPaintingsUpdated] = useState([])
  const [errors, setErrors] = useState([])
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.user);

  const classes = useStyles();

  useEffect(() => {
    setFormData(new FormData())
  }, []);

  const handleChange = e => {
    formData.set("csv", e.target.files[0])
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    uploadPaintingCSVFormData(formData, user.token).then(res => {
      console.log({ ...res })
      if (res.response && res.response.data.error) {
        console.log("ey")
        toast.error(res.response.data.error.message)
      }
      res.data.paintingsAdded && setPaintingsAdded(res.data.paintingsAdded)
      res.data.paintingsUpdated && setPaintingsUpdated(res.data.paintingsUpdated)
      res.data.errors && setErrors(res.data.errors)
      setOpen(true)
      console.log("open: ", open)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  const handleClose = () => setOpen(false)

  return (
    <div className="page-frame">
      <form className="standard-form" onSubmit={handleSubmit}>
        <h4>Add and Update Paintings from CSV</h4>
        <label className="button button-standard-size button-basic">
          <input onChange={handleChange} type="file" accept=".csv" />
        </label>
        <button style={{ height: "40px", cursor: "pointer" }} disabled={loading} variant="contained" color="primary">SEND CSV</button>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Results</h2>
          <AddedPaintingsResultsAccordion paintingsAdded={paintingsAdded} paintingsUpdated={paintingsUpdated} errors={errors} />
          <Button variant="contained" color="primary" onClick={() => setOpen(false)} style={{ float: "right", width: "140px" }}>OK</Button>
        </div>
      </Modal>
    </div>

  )
}
export default AddPaintingsFromCSV