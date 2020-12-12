import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Icon, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    background: "#e9e7e2",
    boxSizing: "border-box",
    '&:hover': {
      boxShadow: '1px 1px 5px blue'
    }
  },
  icon: {
    height: 140,
    width: "100%",
    display: "block",
    '& svg': {
      fontSize: 140
    }
  },
});


export const DashboardCard = ({ title, url, icon }) => {
  const classes = useStyles();

  return (
    <Link to={url}>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {title}
          </Typography>
          <Icon className={classes.icon}>
            {icon}
          </Icon>
        </CardContent>
      </Card>
    </Link>
  )
}
export default DashboardCard