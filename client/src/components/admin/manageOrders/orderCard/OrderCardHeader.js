import React from 'react'
import { Typography, makeStyles } from "@material-ui/core"
import classnames from 'classnames'

const useStyles = makeStyles((theme) => ({
  headerText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 10
    }
  }
}))

const OrderCardHeader = ({ orderState }) => {
  const classes = useStyles()
  return (
    <table className="order-card-header">
      <thead>
        <tr>
          <th className="order-card-header-table-header">
            <Typography variant="body1" className={classes.headerText}>ORDER ID</Typography>
          </th>
          <th className="order-card-header-table-header">
            <Typography variant="body1" className={classes.headerText}>TOTAL</Typography>
          </th>
          <th className="order-card-header-table-header">
            <Typography variant="body1" className={classes.headerText}>DATE</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={classnames("order-card-header-table-datum", classes.headerText)}>
            {orderState._id}
          </td>
          <td className={classnames("order-card-header-table-datum", classes.headerText)}>
            ${orderState.orderTotal}
          </td>
          <td className={classnames("order-card-header-table-datum", classes.headerText)}>
            {new Date(orderState.createdAt).toLocaleDateString() + " at " + new Date(orderState.createdAt).toLocaleTimeString()}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export default OrderCardHeader