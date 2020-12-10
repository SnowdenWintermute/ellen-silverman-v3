import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { uploadMultiplePaintingImages } from '../../apiCalls/paintings'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const AddMultiplePaintingPhotos = () => {
  const classes = useStyles();
  const [photos, setPhotos] = useState([])
  const [formData, setFormData] = useState(null)
  const [photosTotalSize, setPhotosTotalSize] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

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
    setFormData(new FormData())
    console.log(res)
  }

  return (
    <div className="page-frame">
      <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto" }}>
        <label className="button button-basic">
          Photos must have exact same name as painting title
        <input type="file" multiple accept="images/*" onChange={handleChange} files={photos} />
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
    </div>
  )
}

export default AddMultiplePaintingPhotos