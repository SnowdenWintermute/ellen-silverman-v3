import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Grid, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const useStyles = makeStyles(() => ({
  header: {
    color: "black",
  },
  subHeader: {
    marginBottom: "10px"
  }
}));

const AdminFeatureHeader = ({ headerText, subHeaderText }) => {
  const classes = useStyles()
  return (
    <Grid container item xs={12}>
      <Grid item xs={1}>
        <Link to="/admin">
          <IconButton>
            <Icon>
              <ArrowBackIosRoundedIcon />
            </Icon>
          </IconButton>
        </Link>
      </Grid>
      <Grid item xs={10} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h5" className={classes.header}>{headerText}</Typography>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={1} />
      <Grid item xs={10} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="body1" className={classes.subHeader}>{subHeaderText}</Typography>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  )
}
export default AdminFeatureHeader