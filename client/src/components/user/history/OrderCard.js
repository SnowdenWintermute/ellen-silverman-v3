import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Card, Typography, FormControl, InputLabel, MenuItem, Button, Grid, makeStyles, CircularProgress, Select } from "@material-ui/core"
import OrderPaintingCard from './OrderPaintingCard'
import OrderShippingAddressCard from './OrderShippingAddressCard'
import ConfirmOrderStatusChangeModal from './ConfirmOrderStatusChangeModal'
import RequestReturnModal from './RequestReturnModal'
import { changeOrderStatus } from '../../../apiCalls/admin'
import { submitReturnRequest } from '../../../apiCalls/user'
import { toast } from "react-toastify"

const useStyles = makeStyles((theme) => ({
  orderCard: {
    marginBottom: 20,
    maxWidth: 1000,
    margin: "0 auto",
    [theme.breakpoints.down('xs')]: {
      overflowX: "scroll"
    }
  },
  orderCardBody: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column-reverse"
    }
  },
  statusElement: {
    textAlign: "right",
    [theme.breakpoints.down('xs')]: {
      textAlign: "left"
    }
  },
}))


const OrderCard = ({ order, isAdmin, removeOrderFromList }) => {
  isAdmin = false
  const classes = useStyles()
  const user = useSelector(state => state.user)
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [orderPreviousStatus, setOrderPreviousStatus] = useState(order.status)
  const [confirmOrderStatusChangeModalOpen, setConfirmOrderStatusChangeModalOpen] = useState(false)
  const [requestReturnModalOpen, setRequestReturnModalOpen] = useState(false)
  const mountedRef = useRef(true)

  const onOrderStatusChange = (e) => {
    setOrderPreviousStatus(orderStatus)
    setOrderStatus(e.target.value)
    setConfirmOrderStatusChangeModalOpen(true)
  }

  const onCancelStatusChange = () => {
    setOrderStatus(orderPreviousStatus)
    setConfirmOrderStatusChangeModalOpen(false)
  }

  const onConfirmStatusChange = async () => {
    try {
      const updatedOrder = await changeOrderStatus(order._id, orderStatus, user.token)
      if (!mountedRef) return null
      console.log(updatedOrder)
      toast.success("Successfully changed order status to " + updatedOrder.data.status)
      console.log(updatedOrder.data._id)
      removeOrderFromList(updatedOrder.data._id)
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
    setConfirmOrderStatusChangeModalOpen(false)
  }

  const handleReturnRequest = async ({ orderId, selectedPaintings, returnNotes }) => {
    try {
      const res = await submitReturnRequest(orderId, selectedPaintings, returnNotes, user.token)
      if (res.data.error) toast.error(res.data.error)
      console.log(res)
      setRequestReturnModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
      setRequestReturnModalOpen(false)
    }
  }

  const getOrderStatusElement = () =>
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
      (<Typography variant="body1"><strong>Status:</strong> {order.status && order.status.toUpperCase()}</Typography>)

  if (!order._id) return null

  return (
    <Card className={classes.orderCard} elevation={3}>
      <ConfirmOrderStatusChangeModal open={confirmOrderStatusChangeModalOpen} handleClose={() => setConfirmOrderStatusChangeModalOpen(false)} order={order} orderStatus={orderStatus} onCancelStatusChange={onCancelStatusChange} onConfirmStatusChange={onConfirmStatusChange} />
      <RequestReturnModal open={requestReturnModalOpen} handleClose={() => setRequestReturnModalOpen(false)} handleReturnRequest={handleReturnRequest} order={order} />
      <Grid container>
        <Grid item xs={12}>
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
                  {order._id}
                </td>
                <td className="order-card-header-table-datum">
                  ${order.orderTotal}
                </td>
                <td className="order-card-header-table-datum">
                  {new Date(order.createdAt).toLocaleDateString() + " at " + new Date(order.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <div className="order-card-body">
          <Grid container className={classes.orderCardBody} spacing={2}>
            <Grid item sm={7} xs={12} className={classes.paintingCardHolder}>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Works Purchased:</strong></Typography>
              </Grid>
              <Grid item xs={12}>
                {order.paintings.map((painting, i) =>
                  painting.painting && painting.painting.thumbnail ?
                    <OrderPaintingCard key={painting.painting.title} painting={painting.painting} />
                    : <CircularProgress />
                )}
              </Grid>
            </Grid>
            <Grid item sm={5} xs={12}>
              <Grid item xs={12} className={classes.statusElement}>
                {getOrderStatusElement()}
              </Grid>
              <Grid item xs={12}>
                <OrderShippingAddressCard order={order} address={order.shippingAddress} isAdmin={isAdmin} />
                <br />
                {!isAdmin && <Button variant="outlined" color="primary" onClick={() => setRequestReturnModalOpen(true)}>Request Return</Button>}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Card>
  )
}
export default OrderCard