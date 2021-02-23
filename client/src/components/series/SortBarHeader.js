import React from 'react'
import { Typography, FormControl, InputLabel, Select, MenuItem, Card, Grid, makeStyles } from "@material-ui/core";
import toTitleCase from '../utils/toTitleCase'

const useStyles = makeStyles(theme => ({
  sortBar: {
    width: "100%",
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
      marginRight: 0,
      marginLeft: 0,
      // paddingTop: 10,
      display: 'flex',
      flexDirection: 'row'
    }
  },
  sortFilter: {
    width: 200,
    maxWidth: "100%",
    [theme.breakpoints.down('xs')]: {
    }
  }
}))

const SortBarHeader = ({ header, sortParameter, onSelectSortParameter, filterOptions, children }) => {
  const classes = useStyles()

  return (
    <Card className={classes.sortBar}>
      <Grid container>
        <Grid container justify="space-between" alignItems="center">
          <Grid item sm={9} xs={8}>
            <Typography variant="h5" style={{ marginLeft: "20px" }}>{header}</Typography>
          </Grid>
          <Grid container item sm={3} xs={4} justify="flex-end">
            <FormControl variant="filled" className={classes.sortFilter}>
              <InputLabel>Sort</InputLabel>
              <Select labelId="select-sort" onChange={(e) => onSelectSortParameter(e)} value={sortParameter}>
                {filterOptions?.map(option => <MenuItem key={option} value={option}>{toTitleCase(option)}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {children}
      </Grid>
    </Card>
  )
}
export default SortBarHeader