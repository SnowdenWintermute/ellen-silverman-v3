import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  infoGrid: {
    paddingLeft: 20,
    paddingBottom: 20
  }
}))

const SeriesHeaderInfo = ({ series }) => {
  const classes = useStyles()
  return (
    <Grid container item xs={12} className={classes.infoGrid}>
      <Grid item sm={6} xs={12}>
        <Typography variant="body2">
          {series.numberSold}/{series.numberOfPaintings} paintings sold
          </Typography>
        <Typography variant="body2">
          Painted {
            series.years.earliest === series.years.latest
              ?
              <span>{series.years.earliest}</span>
              :
              <span>{series.years.earliest} to {series.years.latest} </span>
          }
        </Typography>
      </Grid>
    </Grid>
  )
}
export default SeriesHeaderInfo