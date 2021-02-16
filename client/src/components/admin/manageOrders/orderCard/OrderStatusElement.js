import React from 'react'
import { Typography, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"

const OrderStatusElement = ({ isAdmin, onOrderStatusChange, orderStatus }) =>
  isAdmin ?
    <FormControl variant="filled">
      <InputLabel>Status</InputLabel>
      <Select labelId="select-series" onChange={(e) => onOrderStatusChange(e)} value={orderStatus}>
        <MenuItem value={"processing"}>
          Processing
       </MenuItem>
        <MenuItem value={"shipped"}>
          Shipped
       </MenuItem>
        <MenuItem value={"return requested"}>
          Return Requested
       </MenuItem>
        <MenuItem value={"returned"}>
          Returned
       </MenuItem>
        <MenuItem value={"cancelled"}>
          Cancelled
       </MenuItem>
        <MenuItem value={"completed"}>
          Completed
       </MenuItem>
      </Select>
    </FormControl>
    :
    (<Typography variant="body1"><strong>Status:</strong> {orderStatus && orderStatus.toUpperCase()}</Typography>)

export default OrderStatusElement