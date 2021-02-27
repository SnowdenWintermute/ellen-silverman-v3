import React from 'react'
import { makeStyles, TextField, Button, Icon, MenuItem, FormControl, InputLabel, Select, Grid, Card } from '@material-ui/core'
import classnames from 'classnames'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  searchForm: {
    width: "100%"
  },
  squareElement: {
    borderRadius: 0
  },
  orderSearchInput: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '75%'
    }
  },
  searchButton: {
    height: 56,
    border: "1px solid grey",
    borderLeft: "0px",
    borderTop: "0px",
    [theme.breakpoints.down('xs')]: {
      width: '25%',
      minWidth: '40px',
      borderRight: "0px",
    }
  },
  selectElementFormControl: {
    width: "100%"
  },
  selectElement: {
    width: '100%',
  },
}))

const OrderFilterBar = ({ onSearchOrderById, orderIdSearching, onSelectFilter, setOrderIdSearching, orderStatusFilter }) => {
  const classes = useStyles()
  return (
    <Card elevation={5}>
      <form className={classes.searchForm} onSubmit={onSearchOrderById}>
        <Grid container>
          <Grid item xs={12} sm={9} className="TextField-without-border-radius">
            <TextField
              className={classes.orderSearchInput}
              variant="filled"
              value={orderIdSearching}
              onChange={e => setOrderIdSearching(e.target.value)}
              placeholder="Search orders by id" />
            <Button
              type="submit"
              variant="outlined"
              className={classnames(classes.searchButton, classes.squareElement)}>
              <Icon>
                <SearchIcon />
              </Icon>
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl variant="filled" className={classes.selectElementFormControl}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                className={classnames(classes.squareElement, classes.selectElement)}
                labelId="select-series"
                onChange={(e) => onSelectFilter(e)}
                value={orderStatusFilter}>
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
      </form>
    </Card>
  )
}
export default OrderFilterBar