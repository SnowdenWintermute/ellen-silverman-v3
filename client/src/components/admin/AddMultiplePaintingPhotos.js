import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { uploadMultiplePaintingImages } from '../../apiCalls/paintings'
import { makeStyles } from '@material-ui/core/styles';
import { Button, LinearProgress, Grid, Card, CardMedia, Dialog } from '@material-ui/core'
import AdminFeatureHeader from './subComponents/AdminFeatureHeader'
import AddedPaintingImagesResultsAccordion from './AddedPaintingImagesResultsAccordion';
import StandardModal from '../common/modal/StandardModal'
import MaterialPaperNarrow from '../layout/MaterialPaperNarrow'
import MultipleImageInput from '../forms/MultipleImageInput'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  imageInput: {
    marginBottom: "10px"
  },
  submitButton: {
    width: "100%",
    marginBottom: "10px"
  },
  showResultsButton: {
    marginTop: "10px",
    width: "100%"
  },
  imageCard: {
    height: "80px",
    width: "80px"
  },
  media: {
    height: "80px",
    maxWidth: "100%"
  },
  dialog: {
    padding: 20
  }
}));

const AddMultiplePaintingPhotos = () => {
  const classes = useStyles();
  const [inputKey, setInputKey] = useState(0)
  const [photos, setPhotos] = useState([])
  const [formData, setFormData] = useState(null)
  const [imagesTotalSize, setImagesTotalSize] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [imagesAdded, setImagesAdded] = useState([])
  const [imagesUpdated, setImagesUpdated] = useState([])
  const [errors, setErrors] = useState([])

  const user = useSelector(state => state.user)
  useEffect(() => { setFormData(new FormData()) }, [])

  const handleChange = (e) => {
    setPhotos([...e.target.files])
    let totalSize = 0
    for (const file of e.target.files) {
      totalSize += file.size
      formData.set(file.name, file)
    }
    setImagesTotalSize(totalSize)
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
    setImagesTotalSize(0)
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
      <MaterialPaperNarrow>
        <Grid container item xs={12}>
          <AdminFeatureHeader headerText={"Add Multiple Painting Images"} subHeaderText={"Image names must match painting names exactly"} />
          <Grid item xs={12}>
            {(loading && progress !== 100) ? <LinearProgress variant="determinate" value={progress} /> : loading && <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <MultipleImageInput selectedImages={photos} handleChange={handleChange} imagesTotalSize={imagesTotalSize} className={classes.imageInput} />
              <Button variant="contained" color="primary" className={classes.submitButton} disabled={loading || !photos.length} type="submit">UPLOAD PHOTOS</Button>
            </form>
          </Grid>
          <Grid item container spacing={1} xs={12}>

            {
              photos.map((photo, i) => (
                <Grid item xs={2} key={i}>
                  <Card>
                    <CardMedia className={classes.media} image={URL.createObjectURL(photo)} title={photo.name} />
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        {(imagesAdded.length > 0 || imagesUpdated.length > 0 || errors.length > 0) && <Button className={classes.showResultsButton} variant="outlined" color="primary" onClick={() => setOpen(true)}>Show most recent upload results</Button>}
      </MaterialPaperNarrow>
      <Dialog open={open} handleClose={handleClose}>
        <div className={classes.dialog}>
          <h2 id="simple-modal-title">Results</h2>
          <AddedPaintingImagesResultsAccordion paintingImagesAdded={imagesAdded} paintingImagesUpdated={imagesUpdated} errors={errors} />
          <Button variant="contained" color="primary" onClick={() => setOpen(false)} style={{ float: "right", width: "140px" }}>OK</Button>
        </div>
      </Dialog>
    </div>
  )
}

export default AddMultiplePaintingPhotos