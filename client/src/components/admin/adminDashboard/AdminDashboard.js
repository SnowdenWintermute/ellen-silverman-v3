import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PanoramaIcon from '@material-ui/icons/Panorama';
import ListIcon from '@material-ui/icons/List';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashboardCard from './DashboardCard'
import MaterialPaperBasic from '../../common/paper/MaterialPaperBasic';

const useStyles = makeStyles(() => ({
  header: {
    textAlign: "center",
    color: "black"
  },
  gridItem: {
    height: "100%",
  },
  innerGrid: {
    margin: "0 auto",
    paddingBottom: 10
  }
}));

const AdminDashboard = () => {
  const classes = useStyles();

  return (
    <div className="page-frame">
      <MaterialPaperBasic>
        <Grid item container spacing={3} xs={12} className={classes.innerGrid}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.header}>Admin Dashboard</Typography>
          </Grid>
          <Grid item xs={6} lg={3} className={classes.gridItem}>
            <DashboardCard title={"Add Painting"} url={"/admin/add-painting"} icon={<PanoramaIcon />} />
          </Grid>
          <Grid item xs={6} lg={3} className={classes.gridItem}>
            <DashboardCard title={"Manage Series' and Paintings"} url={"/admin/manage-series"} icon={<PostAddIcon />} />
          </Grid>
          <Grid item xs={6} lg={3} className={classes.gridItem}>
            <DashboardCard title={"Add Paintings from CSV"} url={"/admin/add-paintings-from-csv"} icon={<ListIcon />} />
          </Grid>
          <Grid item xs={6} lg={3} className={classes.gridItem}>
            <DashboardCard title={"Add Painting Photos"} url={"/admin/add-multiple-painting-photos"} icon={<PermMediaIcon />} />
          </Grid>
          <Grid item xs={6} lg={3} className={classes.gridItem}>
            <DashboardCard title={"Manage Orders"} url={"/admin/orders"} icon={<LocalShippingIcon />} />
          </Grid>
          <Grid item xs={6} lg={3} className={classes.gridItem}>
            <DashboardCard title={"Add Page"} url={"/admin/add-page"} icon={<AddBoxIcon />} />
          </Grid>
        </Grid>
      </MaterialPaperBasic>
    </div >
  );
}
export default AdminDashboard