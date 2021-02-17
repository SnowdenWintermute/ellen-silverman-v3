import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { uploadMultiplePaintingImages } from '../../../apiCalls/paintings'
import { LinearProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AdminFeatureHeader from '../subComponents/AdminFeatureHeader'
import AddedImagesResultsDialog from './AddedImagesResultsDialog'
import MaterialPaperNarrow from '../../common/paper/MaterialPaperNarrow'
import MultipleImageInput from '../../forms/MultipleImageInput'
import PrimaryButton from '../../common/button/PrimaryButton'
import ImagePreviewCard from './ImagePreviewCard'
import { toast } from 'react-toastify'

const useStyles = makeStyles(() => ({
  marginBottom: {
    marginBottom: "10px"
  },
  showResultsButton: {
    marginTop: "10px",
  },
}));

const AddMultiplePaintingPhotos = () => {
  const classes = useStyles();
  const formData = useRef(new FormData())
  const [photos, setPhotos] = useState([])
  const [imagesTotalSize, setImagesTotalSize] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [resultsDialogOpen, setResultsDialogOpen] = useState(false)
  const [imagesAdded, setImagesAdded] = useState([])
  const [imagesUpdated, setImagesUpdated] = useState([])
  const [errors, setErrors] = useState([])

  const user = useSelector(state => state.user)

  const handleChange = (e) => {
    setPhotos([...e.target.files])
    let totalSize = 0
    formData.current = new FormData()
    for (const file of e.target.files) {
      totalSize += file.size
      formData.current.set(file.name, file)
    }
    setImagesTotalSize(totalSize)
  }

  const handleProgressEvent = progressEvent => setProgress(parseInt(Math.round(progressEvent.loaded * 100)) / progressEvent.total)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setProgress(0)
    try {
      const res = await uploadMultiplePaintingImages(formData.current, user.token, handleProgressEvent)
      const results = res.data
      setPhotos([])
      setImagesTotalSize(0)
      formData.current = new FormData()
      setResultsDialogOpen(true)
      setImagesAdded(results.paintingImagesSaved)
      setImagesUpdated(results.paintingImagesUpdated)
      setErrors(results.errors)
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
    setProgress(0)
    setLoading(false)
  }

  const handleClose = () => setResultsDialogOpen(false)

  return (
    <div className="page-frame">
      <MaterialPaperNarrow>
        <Grid container item xs={12}>
          <AdminFeatureHeader headerText={"Add Multiple Painting Images"} subHeaderText={"Image names must match painting names exactly"} />
          <Grid item xs={12}>
            {(loading && progress !== 100) ?
              <LinearProgress variant="determinate" value={progress} /> : loading &&
              <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <MultipleImageInput
                selectedImages={photos}
                handleChange={handleChange}
                imagesTotalSize={imagesTotalSize}
                className={classes.marginBottom}
              />
              <PrimaryButton
                title="UPLOAD PHOTOS"
                customClasses={classes.marginBottom}
                disabled={loading || !photos.length}
                isSubmit
                fullWidth
              />
            </form>
          </Grid>
          <Grid item container spacing={1} xs={12}>
            {photos.map((photo, i) => <ImagePreviewCard key={i} photo={photo} />)}
          </Grid>
        </Grid>
        {(imagesAdded.length > 0 || imagesUpdated.length > 0 || errors.length > 0) &&
          <PrimaryButton
            title="Show most recent upload results"
            onClick={() => setResultsDialogOpen(true)}
            customClasses={classes.showResultsButton}
            fullWidth
            outlined
          />}
      </MaterialPaperNarrow>
      <AddedImagesResultsDialog
        open={resultsDialogOpen}
        onClose={handleClose}
        setResultsDialogOpen={setResultsDialogOpen}
        imagesAdded={imagesAdded}
        imagesUpdated={imagesUpdated}
        errors={errors}
      />
    </div>
  )
}

export default AddMultiplePaintingPhotos