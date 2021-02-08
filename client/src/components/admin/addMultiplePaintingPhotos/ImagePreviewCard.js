import React from 'react'
import { Grid, Card, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  media: {
    height: "80px",
    maxWidth: "100%"
  },
}));

const ImagePreviewCard = ({ photo }) => {
  const classes = useStyles()
  return (
    <Grid item xs={2}>
      <Card>
        <CardMedia className={classes.media} image={URL.createObjectURL(photo)} title={photo.name} />
      </Card>
    </Grid>
  )
}
export default ImagePreviewCard