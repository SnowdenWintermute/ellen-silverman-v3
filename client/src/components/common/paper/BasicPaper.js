import { Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  paper: {
    marginLeft: 10,
    marginRight: 10,
    padding: 15
  },
})

const BasicPaper = ({ children }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      {children}
    </Paper>
  )
}
export default BasicPaper