import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, CircularProgress, Typography, TextField, Button, Icon, MenuItem, FormControl, InputLabel, Select, Grid, Card } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getOrdersByStatus, getOrderById } from '../../apiCalls/admin'
import { getOwnOrdersByStatus, getOwnOrderById } from '../../apiCalls/user'
import BasicPaper from '../common/paper/BasicPaper'
import OrderCard from '../user/history/OrderCard'
import { toast } from 'react-toastify';
import OrderFilterBar from './OrderFilterBar'

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: 20,
    maxWidth: 1000,
    margin: "0 auto",
  },
  pageTitle: {
    marginBottom: 10
  },
}))

const ManageOrders = ({ isAdmin }) => {
  const classes = useStyles()
  const user = useSelector(state => state.user)
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [orderStatusFilter, setOrderStatusFilter] = useState("processing")
  const [orderIdSearching, setOrderIdSearching] = useState("")

  const fetchFilteredOrders = useCallback(async () => {
    if (!orderStatusFilter) return
    try {
      console.log(isAdmin)
      setLoadingOrders(true)
      const res = isAdmin ? await getOrdersByStatus(orderStatusFilter, user.token) : await getOwnOrdersByStatus(orderStatusFilter, user.token)
      console.log(res)
      setOrders(res.data)
      setLoadingOrders(false)
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }, [setOrders, orderStatusFilter, user.token, isAdmin])

  useEffect(() => {
    fetchFilteredOrders(orderStatusFilter)
  }, [fetchFilteredOrders, orderStatusFilter])

  const onSelectFilter = (e) => {
    setOrderStatusFilter(e.target.value)
  }

  const onSearchOrderById = async e => {
    e.preventDefault()
    try {
      setOrderStatusFilter(null)
      const order = isAdmin ? await getOrderById(orderIdSearching, user.token) : await getOwnOrderById(orderIdSearching, user.token)
      console.log(order)
      if (isAdmin && !order.data.status) {
        toast.error("No order by that Id exists")
      } else {
        console.log(`order id ${order.data._id} found`)
        if (order.data._id) setOrders([order.data])
        else setOrders([])
      }
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }

  const removeOrderFromList = (orderId) => {
    console.log(orderId)
    const newOrderList = orders.map(order => order._id !== orderId && order)
    console.log(newOrderList)
    setOrders(newOrderList)
  }

  return (
    <div className="page-frame">
      <div className="orders-holder">
        <BasicPaper>
          <div className={classes.pageHeader}>
            <Typography variant="h5" className={classes.pageTitle}>Manage Orders</Typography>
            <Card elevation={5}>
              <OrderFilterBar onSearchOrderById={onSearchOrderById} orderIdSearching={orderIdSearching} onSelectFilter={onSelectFilter} setOrderIdSearching={setOrderIdSearching} orderStatusFilter={orderStatusFilter} />
            </Card>
          </div>
          {loadingOrders && <div className="flex-center">
            <CircularProgress />
          </div>}
          {!loadingOrders && <>
            {orders.length > 0 && orders.map(order => order._id && <OrderCard order={order} key={order._id} loadingOrders={loadingOrders} isAdmin={isAdmin} user={user} removeOrderFromList={removeOrderFromList} />).reverse()}
            {orders.length < 1 && <Typography variant="body1" className={classes.pageHeader}>No orders found with selected parameters.</Typography>}
          </>
          }
        </BasicPaper>
      </div>
    </div>
  )
}
export default ManageOrders