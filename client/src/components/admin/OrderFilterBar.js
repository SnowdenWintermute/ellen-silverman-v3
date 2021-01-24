import React from 'react'
import { makeStyles, TextField, Button, Icon, MenuItem, FormControl, InputLabel, Select, Grid, } from '@material-ui/core'
import classnames from 'classnames'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  squareElement: {
    borderRadius: 0
  },
  orderSearchInput: {
    width: 300,
  },
  searchButton: {
    height: 56,
    border: "1px solid grey",
    borderLeft: "0px",
    borderTop: "0px"
  },
  selectElement: {
    width: 190
  },
}))

const OrderFilterBar = ({ onSearchOrderById, orderIdSearching, onSelectFilter, setOrderIdSearching, orderStatusFilter }) => {
  const classes = useStyles()
  return (
    <form className={classes.searchForm} onSubmit={onSearchOrderById}>
      <Grid container justify="space-between">
        <Grid item className="TextField-without-border-radius">
          <TextField className={classnames(classes.orderSearchInput, classes.textField)} variant="filled" value={orderIdSearching} onChange={e => setOrderIdSearching(e.target.value)} placeholder="Search orders by id" />
          <Button type="submit" variant="outlined" className={classnames(classes.searchButton, classes.squareElement)}><Icon><SearchIcon /></Icon></Button>
        </Grid>
        <Grid item>
          <FormControl variant="filled">
            <InputLabel>Filter by Status</InputLabel>
            <Select className={classnames(classes.squareElement, classes.selectElement)} labelId="select-series" onChange={(e) => onSelectFilter(e)} value={orderStatusFilter}>
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"processing"}>Processing</MenuItem>
              <MenuItem value={"shipped"}>Shipped</MenuItem>
              <MenuItem value={"return requested"}>Return Requested</MenuItem>
              <MenuItem value={"returned"}>Returned</MenuItem>
              <MenuItem value={"cancelled"}>Cancelled</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form >
  )
}
export default OrderFilterBar