import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PanoramaIcon from '@material-ui/icons/Panorama';
import ListIcon from '@material-ui/icons/List';
import DashboardCard from './DashboardCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: "100%"
  },
  header: {
    color: "black"
  }
}));

const AdminDashboard = () => {
  const classes = useStyles();

  return (
    <div className="page-frame">
      <div className={classes.root}>
        <Grid container spacing={0} justify="space-between" alignItems="center">
          <Grid item xs={0} sm={1}>
            {/* Gutter */}
          </Grid>
          <Grid item container spacing={3} xs={12} sm={10} justify="space-between" alignItems="center">
            <Paper className={classes.paper}>
              <Grid container spacing={3} xs={12} justify="space-between" alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h5" className={classes.header}>Admin Dashboard</Typography>
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <DashboardCard title={"Add Painting"} url={"/admin/add-painting"} icon={<PanoramaIcon />} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <DashboardCard title={"Add Series"} url={"/admin/add-series"} icon={<PostAddIcon />} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <DashboardCard title={"Add Paintings from CSV"} url={"/admin/add-paintings-from-csv"} icon={<ListIcon />} />
                </Grid>
                <Grid item xs={6} sm={4} lg={3}>
                  <DashboardCard title={"Add Painting Photos"} url={"/admin/add-multiple-painting-photos"} icon={<PermMediaIcon />} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={0} sm={1}>
            {/* Gutter */}
          </Grid>
        </Grid>
      </div>
    </div >
  );
  // return (
  //   <div>
  //     <Link to="/admin/add-painting">Add Painting</Link>
  //     <Link to="/admin/add-paintings-from-csv">Add Paintings from CSV</Link>
  //     <Link to="/admin/add-series">Add Series</Link>
  //     <Link to="/admin/add-multiple-painting-photos">Add Painting Photos</Link>
  //   </div>
  // )
}
export default AdminDashboard