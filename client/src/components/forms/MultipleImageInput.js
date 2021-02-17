import React, { useRef } from 'react'
import { Button, Paper, Grid, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import classnames from 'classnames'

const useStyles = makeStyles(theme => ({
  root: {

    [theme.breakpoints.up("sm")]: {
      height: "220px",
    },
    width: "100%",
    background: "#e0e0e0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },
  paper: {
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "140px",
    padding: "10px",
    [theme.breakpoints.up("sm")]: {
      height: "100%"
    }
  },
  imageGridContainer: {
    width: "100%",
    height: "100%",
    padding: '10px',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 120,
    width: "100%",
    display: "block",
    '& svg': {
      fontSize: 120
    }
  },
  button: {
    marginBottom: "10px",
    background: "white",
  }
}))


const MultipleImageInput = ({ handleChange, selectedImages, imagesTotalSize, className }) => {
  const classes = useStyles()
  const hiddenFileInput = useRef(null)

  const handleClick = event => hiddenFileInput.current.click()

  return (
    <Grid container justify="space-between" alignItems="center" onClick={handleClick} className={classnames(classes.root, className)}>
      <Grid container item xs={12} sm={6} >
        <Grid container item xs={12} justify="center" >
          <Button variant="contained" className={classes.button}>
            Select Images
        </Button>
        </Grid>
        <Grid container item xs={12} justify="center">
          {selectedImages.length < 1 && "Please choose an image to upload"}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.imageGridContainer} >
        <Paper className={classes.paper}>
          {selectedImages.length > 0 ? `Total combined size: ${imagesTotalSize / 1000000} mb` : <Icon className={classes.icon}>
            <InsertPhotoIcon />
          </Icon>}
        </Paper>
      </Grid>
      <input ref={hiddenFileInput} onChange={handleChange} type="file" multiple name="images" accept="image/*" style={{ display: 'none' }} />
    </Grid>
  )
}
export default MultipleImageInput