import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  style: {
    background: "red",
    color: "white",
    "&:hover": {
      background: "red",
      filter: "brightness(85%)",
    },
  }
}))

const RedButton = ({ onClick, title }) => {
  const classes = useStyles()
  return (
    <Button variant="contained" className={classes.style} onClick={onClick}>
      {title}
    </Button>
  )
}

export default RedButton