import React, { useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Card, Typography, FormControl, InputLabel, MenuItem, Button, Grid, makeStyles, CircularProgress, Select } from "@material-ui/core"
import OrderPaintingCard from './OrderPaintingCard'
import OrderShippingAddressCard from './OrderShippingAddressCard'
import ConfirmOrderStatusChangeModal from './ConfirmOrderStatusChangeModal'
import RequestReturnModal from './RequestReturnModal'
import { changeOrderStatus } from '../../../apiCalls/admin'
import { submitReturnRequest, cancelOrder } from '../../../apiCalls/user'
import { toast } from "react-toastify"
import CancelOrderModal from './CancelOrderModal'

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
  const classes = useStyles()
  const user = useSelector(state => state.user)
  const [orderState, setOrderState] = useState(order)
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [orderPreviousStatus, setOrderPreviousStatus] = useState(order.status)
  const [confirmOrderStatusChangeModalOpen, setConfirmOrderStatusChangeModalOpen] = useState(false)
  const [requestReturnModalOpen, setRequestReturnModalOpen] = useState(false)
  const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false)

  const mountedRef = useRef(true)

  const onOrderStatusChange = useCallback((e) => {
    setOrderPreviousStatus(orderStatus)
    setOrderStatus(e.target.value)
    setConfirmOrderStatusChangeModalOpen(true)
  }, [orderStatus])

  const onCancelStatusChange = () => {
    setOrderStatus(orderPreviousStatus)
    setConfirmOrderStatusChangeModalOpen(false)
  }

  const onConfirmStatusChange = async () => {
    try {
      const updatedOrder = await changeOrderStatus(orderState._id, orderStatus, user.token)
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
      else {
        toast.success("Return request received. Check your email for updates.")
        setOrderStatus(res.data.status)
        setOrderState(res.data)
        console.log(res.data.status)
      }
      setRequestReturnModalOpen(false)
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
      setRequestReturnModalOpen(false)
    }
  }

  const submitCancelOrder = async (orderId) => {
    try {
      const newOrder = await cancelOrder(orderId, user.token)
      if (newOrder.data.error) return toast.error(newOrder.data.error)
      setOrderState(newOrder.data)
      setOrderStatus(newOrder.data.status)
      setCancelOrderModalOpen(false)
      toast.success(`Order ${newOrder.data._id} successfully cancelled`)
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
      setCancelOrderModalOpen(false)
    }
  }

  const getOrderStatusElement = useCallback(() =>
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
      (<Typography variant="body1"><strong>Status:</strong> {orderStatus && orderStatus.toUpperCase()}</Typography>),
    [isAdmin, onOrderStatusChange, orderStatus])

  if (!order._id) return null

  return (
    <Card className={classes.orderCard} elevation={3}>
      <ConfirmOrderStatusChangeModal open={confirmOrderStatusChangeModalOpen} handleClose={() => setConfirmOrderStatusChangeModalOpen(false)} order={orderState} orderStatus={orderStatus} onCancelStatusChange={onCancelStatusChange} onConfirmStatusChange={onConfirmStatusChange} />
      <RequestReturnModal open={requestReturnModalOpen} handleClose={() => setRequestReturnModalOpen(false)} handleReturnRequest={handleReturnRequest} order={orderState} />
      <CancelOrderModal open={cancelOrderModalOpen} handleClose={() => setCancelOrderModalOpen(false)} cancelOrder={submitCancelOrder} order={order} />
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
        </Grid>
        <div className="order-card-body">
          <Grid container className={classes.orderCardBody} spacing={2}>
            <Grid item sm={7} xs={12} className={classes.paintingCardHolder}>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Works Purchased:</strong></Typography>
              </Grid>
              <Grid item xs={12}>
                {orderState.paintings && orderState.paintings.length > 0 && orderState.paintings.map((painting, i) =>
                  painting.painting && painting.painting.thumbnail ?
                    <OrderPaintingCard key={painting.painting.title} paintingOrderObject={painting} />
                    : <CircularProgress />
                )}
              </Grid>
            </Grid>
            <Grid item sm={5} xs={12}>
              <Grid item xs={12} className={classes.statusElement}>
                {getOrderStatusElement()}
              </Grid>
              <Grid item xs={12}>
                <OrderShippingAddressCard order={orderState} address={orderState.shippingAddress} isAdmin={isAdmin} />
                <br />
                {(!isAdmin && (orderState.status === "completed" || orderState.status === "return requested" || orderState.paintings.map(painting => painting.returnRequested).length !== orderState.paintings.length) && orderState.paintings.filter(item => item.returnRequested).length !== orderState.paintings.length) && <Button variant="outlined" color="primary" onClick={() => setRequestReturnModalOpen(true)}>Request Return</Button>}
                {(!isAdmin && orderState.status === "processing") && <Button variant="outlined" color="primary" onClick={() => setCancelOrderModalOpen(true)}>Cancel Order</Button>}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Card>
  )
}
export default OrderCard