import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { uploadMultiplePaintingImages } from '../../apiCalls/paintings'
import { makeStyles } from '@material-ui/core/styles';
import { Button, LinearProgress } from '@material-ui/core'
import AddedPaintingImagesResultsAccordion from './AddedPaintingImagesResultsAccordion';
import { toast } from "react-toastify"
import StandardModal from '../common/modal/StandardModal'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const AddMultiplePaintingPhotos = () => {
  const classes = useStyles();
  const [inputKey, setInputKey] = useState(0)
  const [photos, setPhotos] = useState([])
  const [formData, setFormData] = useState(null)
  const [photosTotalSize, setPhotosTotalSize] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [imagesAdded, setImagesAdded] = useState([])
  const [imagesUpdated, setImagesUpdated] = useState([])
  const [errors, setErrors] = useState([])

  const user = useSelector(state => state.user)
  useEffect(() => { setFormData(new FormData()) }, [])

  const handleChange = (e) => {
    console.log("form edited")
    setPhotos([...e.target.files])
    let totalSize = 0
    for (const file of e.target.files) {
      totalSize += file.size
      formData.set(file.name, file)
    }
    setPhotosTotalSize(totalSize)
  }

  const handleProgressEvent = progressEvent => {
    setProgress(parseInt(Math.round(progressEvent.loaded * 100)) / progressEvent.total)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const res = await uploadMultiplePaintingImages(formData, user.token, handleProgressEvent)
    setLoading(false)
    setProgress(0)
    setPhotos([])
    setPhotosTotalSize(0)
    setFormData(new FormData())
    setInputKey(inputKey + 1)
    setOpen(true)
    setImagesAdded(res.data.paintingImagesSaved)
    setImagesUpdated(res.data.paintingImagesUpdated)
    setErrors(res.data.errors)
    console.log({ ...res })
  }

  const handleClose = () => setOpen(false)

  return (
    <div className="page-frame">
      <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto" }}>
        <label className="button button-basic">
          Photos must have exact same name as painting title
        <input type="file" multiple accept="images/*" onChange={handleChange} files={photos} key={inputKey} />
        </label>
        <p>
          Total combined size: {photosTotalSize / 1000000} mb
        </p>
        <button className="button button-basic button-standard-size" disabled={loading || !photos.length}>UPLOAD PHOTOS</button>
        <div className={classes.root}>
          {loading && <LinearProgress variant="determinate" value={progress} />}
        </div>
      </form>
      {photos.map((photo, i) => <img style={{ height: "80px" }} src={URL.createObjectURL(photo)} key={i} alt={photo.name} />)}
      <StandardModal open={open} handleClose={handleClose}>
        <h2 id="simple-modal-title">Results</h2>
        <AddedPaintingImagesResultsAccordion paintingImagesAdded={imagesAdded} paintingImagesUpdated={imagesUpdated} errors={errors} />
        <Button variant="contained" color="primary" onClick={() => setOpen(false)} style={{ float: "right", width: "140px" }}>OK</Button>
      </StandardModal>
    </div>
  )
}

export default AddMultiplePaintingPhotos