import React from 'react'
import { Typography } from "@material-ui/core"

const OrderCardHeader = ({ orderState }) => {
  return (
    <table className="order-card-header">
      <thead>
        <tr>
          <th className="order-card-header-table-header">
            <Typography variant="body1">ORDER ID</Typography>
          </th>
          <th className="order-card-header-table-header">
            <Typography variant="body1">TOTAL</Typography>
          </th>
          <th className="order-card-header-table-header">
            <Typography variant="body1">DATE</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="order-card-header-table-datum">
            {orderState._id}
          </td>
          <td className="order-card-header-table-datum">
            ${orderState.orderTotal}
          </td>
          <td className="order-card-header-table-datum">
            {new Date(orderState.createdAt).toLocaleDateString() + " at " + new Date(orderState.createdAt).toLocaleTimeString()}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export default OrderCardHeader