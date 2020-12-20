import React from 'react'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import classnames from 'classnames'

const AddSeriesInput = ({ handleNewSeriesInputChange, seriesName, loading, classes }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.header}>Add New Series</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField autoFocus className={classes.input} label="Title" variant="filled" width="75px" onChange={handleNewSeriesInputChange} value={seriesName} />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" className={classnames(classes.addButton, classes.fullWidth)} disabled={loading} variant="contained" color="primary">ADD SERIES</Button>
      </Grid>
    </>
  )
}
export default AddSeriesInput