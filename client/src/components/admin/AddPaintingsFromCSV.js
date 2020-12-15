import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { uploadPaintingCSVFormData } from '../../apiCalls/paintings'
import AddedPaintingsResultsAccordion from './AddedPaintingsResultsAccordion';
import StandardModal from '../common/modal/StandardModal'
import { toast } from "react-toastify"

const AddPaintingsFromCSV = () => {
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [paintingsAdded, setPaintingsAdded] = useState([])
  const [paintingsUpdated, setPaintingsUpdated] = useState([])
  const [errors, setErrors] = useState([])
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.user);

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
      <StandardModal open={open} handleClose={handleClose}>
        <h2 id="simple-modal-title">Results</h2>
        <AddedPaintingsResultsAccordion paintingsAdded={paintingsAdded} paintingsUpdated={paintingsUpdated} errors={errors} />
        <Button variant="contained" color="primary" onClick={() => setOpen(false)} style={{ float: "right", width: "140px" }}>OK</Button>
      </StandardModal>
    </div>

  )
}
export default AddPaintingsFromCSV