import React from 'react'
import { Paper, Grid } from '@material-ui/core'

const MaterialPaperBasic = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={false} sm={1} />
      <Grid item xs={12} sm={10}>
        <Paper>
          {children}
        </Paper>
      </Grid>
      <Grid item xs={false} sm={1} />
    </Grid>
  )
}
export default MaterialPaperBasic