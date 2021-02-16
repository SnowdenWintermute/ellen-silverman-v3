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
  outlined: {
    color: "red",
    border: "1px solid red"
  },
  fullWidth: {
    width: "100%"
  },
})

const RedButton = ({ onClick, title, customClasses, fullWidth, outlined }) => {
  const classes = useStyles()
  return (
    <Button variant={outlined ? "outlined" : "contained"} className={classnames((outlined ? classes.outlined : classes.style), fullWidth && classes.fullWidth, customClasses)} onClick={onClick}>
      {title}
    </Button>
  )
}

export default RedButton