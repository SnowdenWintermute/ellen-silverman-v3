import React from 'react'
import { Card, Typography, Table, TableBody, TableRow, TableCell, Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  orderCard: {
    marginBottom: 10,
    maxWidth: 1000,
    margin: "0 auto"
  }
})

const OrderCard = ({ order }) => {
  const classes = useStyles()
  return (
    <Card className={classes.orderCard}>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <table className="order-card-header">
            <thead>
              <th className="order-card-header-table-header">
                <Typography variant="body1">ORDER PLACED</Typography>
              </th>
              <th className="order-card-header-table-header">
                <Typography variant="body1">TOTAL</Typography>
              </th>
              <th className="order-card-header-table-header">
                <Typography variant="body1">ORDER ID</Typography>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>
                  {new Date(order.createdAt).toLocaleDateString() + " at " + new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td>
                  ${order.orderTotal}
                </td>
                <td>
                  {order._id}
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12}>
          {JSON.stringify(order, null, 2)}
        </Grid>
      </Grid>
    </Card>
  )
}
export default OrderCard