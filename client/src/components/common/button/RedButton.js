import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import classnames from 'classnames'

const useStyles = makeStyles({
  style: {
    background: "red",
    color: "white",
    "&:hover": {
      background: "red",
      filter: "brightness(85%)",
    },
  },
  fullWidth: {
    width: "100%"
  },
})

const RedButton = ({ onClick, title, fullWidth }) => {
  const classes = useStyles()
  return (
    <Button variant="contained" className={classnames(classes.style, fullWidth && classes.fullWidth)} onClick={onClick}>
      {title}
    </Button>
  )
}

export default RedButton