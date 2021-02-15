import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // maxWidth: 'fit-content',
    width: "100%",
    margin: '0 auto'
  }
}))

const MaterialPaperNarrow = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container spacing={0}>
      <Grid item xs={false} sm={2} lg={3} />
      <Grid container item xs={12} sm={8} lg={6}>
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </Grid>
      <Grid item xs={false} sm={2} lg={3} />
    </Grid>
  )
}
export default MaterialPaperNarrow