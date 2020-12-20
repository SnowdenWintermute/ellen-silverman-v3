import React, { useRef } from 'react'
import { Button, Paper, Grid, Icon } from '@material-ui/core';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { makeStyles } from '@material-ui/core/styles'

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


const ImageInput = ({ handleChange, selectedImage }) => {
  const classes = useStyles()
  const hiddenFileInput = useRef(null)

  const handleClick = event => {
    console.log("ey")
    hiddenFileInput.current.click();
  };

  return (
    <Grid container justify="space-between" alignItems="center" onClick={handleClick} className={classes.root}>
      <Grid container item xs={12} sm={6} >
        <Grid item xs={12} >
          <Button variant="contained" className={classes.button}>
            Select Image
        </Button>
        </Grid>
        <Grid item xs={12}>
          {selectedImage ? "Selected image: " + selectedImage.name : "Please choose an image to upload"}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.imageGridContainer} >
        <Paper className={classes.paper}>
          {selectedImage ? <img style={{ height: "100%" }} src={selectedImage ? selectedImage.contentType ? `data:${selectedImage.contentType};base64,${Buffer.from(selectedImage.data).toString('base64')}` : URL.createObjectURL(selectedImage) : ""} key={selectedImage.name} alt={selectedImage.name} /> : <Icon className={classes.icon}>
            <InsertPhotoIcon />
          </Icon>}
        </Paper>
      </Grid>
      <input ref={hiddenFileInput} onChange={handleChange('image')} type="file" name="image" accept="image/*" style={{ display: 'none' }} />
    </Grid>
  )
}
export default ImageInput