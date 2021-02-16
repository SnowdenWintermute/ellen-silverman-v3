import React, { useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Card, Grid, makeStyles } from "@material-ui/core"
import { toast } from "react-toastify"
import ConfirmOrderStatusChangeModal from './modals/ConfirmOrderStatusChangeModal'
import RequestReturnModal from './modals/RequestReturnModal'
import CancelOrderModal from './modals/CancelOrderModal'
import OrderCardHeader from './OrderCardHeader'
import OrderCardBody from './OrderCardBody'
import { changeOrderStatus } from '../../../../apiCalls/admin'
import { submitReturnRequest, cancelOrder } from '../../../../apiCalls/user'

const useStyles = makeStyles((theme) => ({
  orderCard: {
    marginBottom: 20,
    maxWidth: 1000,
    margin: "0 auto",
    [theme.breakpoints.down('xs')]: {
      overflowX: "scroll"
    }
  },
}))

const OrderCard = ({ order, isAdmin, removeOrderFromList, loadingOrders }) => {
  const classes = useStyles()
  const user = useSelector(state => state.user)
  const mountedRef = useRef(true)
  const [orderState, setOrderState] = useState(order)
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [orderPreviousStatus, setOrderPreviousStatus] = useState(order.status)
  const [confirmOrderStatusChangeModalOpen, setConfirmOrderStatusChangeModalOpen] = useState(false)
  const [requestReturnModalOpen, setRequestReturnModalOpen] = useState(false)
  const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false)

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
      toast.success("Successfully changed order status to " + updatedOrder.data.status)
      removeOrderFromList(updatedOrder.data._id)
    } catch (error) {
      console.log(error)
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

  if (!order._id) return null

  return (
    <Card className={classes.orderCard} elevation={3}>
      <ConfirmOrderStatusChangeModal
        open={confirmOrderStatusChangeModalOpen}
        handleClose={() => setConfirmOrderStatusChangeModalOpen(false)}
        order={orderState}
        orderStatus={orderStatus}
        onCancelStatusChange={onCancelStatusChange}
        onConfirmStatusChange={onConfirmStatusChange}
      />
      <RequestReturnModal
        open={requestReturnModalOpen}
        handleClose={() => setRequestReturnModalOpen(false)}
        handleReturnRequest={handleReturnRequest}
        order={orderState}
      />
      <CancelOrderModal
        open={cancelOrderModalOpen}
        handleClose={() => setCancelOrderModalOpen(false)}
        cancelOrder={submitCancelOrder}
        order={order}
      />
      <Grid container>
        <Grid item xs={12}>
          <OrderCardHeader orderState={orderState} />
        </Grid>
        <OrderCardBody
          isAdmin={isAdmin}
          loadingOrders={loadingOrders}
          orderState={orderState}
          orderStatus={orderStatus}
          onOrderStatusChange={onOrderStatusChange}
          setRequestReturnModalOpen={setRequestReturnModalOpen}
          setCancelOrderModalOpen={setCancelOrderModalOpen}
        />
      </Grid>
    </Card>
  )
}
export default OrderCard