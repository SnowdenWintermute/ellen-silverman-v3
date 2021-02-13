import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Icon, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    background: "#e9e7e2",
    boxSizing: "border-box",
    transition: ".3s",
    '&:hover': {
      boxShadow: "0px 5px 5px grey"
    },
    margin: '0 auto',
    height: "100%"
  },
  header: {
    textAlign: 'center'
  },
  icon: {
    height: 100,
    textAlign: "center",
    width: "100%",
    display: "block",
    '& svg': {
      fontSize: 100
    }
  },
});


export const DashboardCard = ({ title, url, icon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={url}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6" className={classes.header}>
            {title}
          </Typography>
          <Icon className={classes.icon}>
            {icon}
          </Icon>
        </CardContent>
      </Link>
    </Card>
  )
}
export default DashboardCard