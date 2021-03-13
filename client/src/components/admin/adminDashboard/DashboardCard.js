import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Icon, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 220,
    background: "#e9e7e2",
    boxSizing: "border-box",
    transition: ".3s",
    "&:hover": {
      boxShadow: "0px 5px 5px grey",
    },
    margin: "0 auto",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      minHeight: 150,
    },
  },
  header: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  icon: {
    height: 100,
    textAlign: "center",
    width: "100%",
    display: "block",
    "& svg": {
      fontSize: 100,
    },
    [theme.breakpoints.down("xs")]: {
      height: 70,
      "& svg": {
        fontSize: 70,
      },
    },
  },
}));

export const DashboardCard = ({ title, url, icon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={url}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            className={classes.header}
          >
            {title}
          </Typography>
          <Icon className={classes.icon}>{icon}</Icon>
        </CardContent>
      </Link>
    </Card>
  );
};
export default DashboardCard;
