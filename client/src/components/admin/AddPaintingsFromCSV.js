import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

import { uploadPaintingCSVFormData } from '../../apiCalls/paintings'

const AddPaintingsFromCSV = () => {
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(false)
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
      console.log(res)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  return (
    <form className="standard-form" onSubmit={handleSubmit}>
      <h4>Post Photo</h4>
      <label className="button button-standard-size button-basic">
        <input onChange={handleChange} type="file" accept=".csv" />
      </label>
      <button style={{ height: "40px", cursor: "pointer" }} disabled={loading} variant="contained" color="primary">SEND CSV</button>
    </form>
  )
}
export default AddPaintingsFromCSV