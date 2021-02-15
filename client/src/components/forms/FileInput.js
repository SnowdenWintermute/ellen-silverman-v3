import React, { useRef } from 'react'
import { Button, Paper, Grid, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import ListIcon from '@material-ui/icons/List';

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
    },
  },
  fileGridContainer: {
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


const FileInput = ({ handleChange, selectedFile }) => {
  const classes = useStyles()
  const hiddenFileInput = useRef(null)

  const handleClick = () => hiddenFileInput.current.click();

  return (
    <Grid container justify="space-between" alignItems="center" onClick={handleClick} className={classes.root}>
      <Grid container item xs={12} sm={6}>
        <Grid container item xs={12} justify="center" >
          <Button variant="contained" className={classes.button}>
            Select File
        </Button>
        </Grid>
        <Grid container item xs={12} justify="center">
          {selectedFile ? "Selected file: " + selectedFile.name : "Please choose a .csv file to upload"}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.fileGridContainer} >
        <Paper className={classes.paper}>
          {selectedFile ? selectedFile.name : <Icon className={classes.icon}>
            <ListIcon />
          </Icon>}
        </Paper>
      </Grid>
      <input ref={hiddenFileInput} onChange={handleChange} type="file" name="file" accept=".csv" style={{ display: 'none' }} />
    </Grid>
  )
}
export default FileInput