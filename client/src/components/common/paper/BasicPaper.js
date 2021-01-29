import { Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    [theme.breakpoints.down("xs")]: {
      overflow: "scroll"
    }
  },
}))

const BasicPaper = ({ children }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      {children}
    </Paper>
  )
}
export default BasicPaper