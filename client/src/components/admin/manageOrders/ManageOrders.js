import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Typography } from '@material-ui/core'
import { toast } from 'react-toastify';
import { getOrdersByStatus, getOrderById } from '../../../apiCalls/admin'
import { getOwnOrdersByStatus, getOwnOrderById } from '../../../apiCalls/user'
import BasicPaper from '../../common/paper/BasicPaper'
import ProgressIndicator from '../../common/progressIndicator/ProgressIndicator'
import OrderCard from './orderCard/OrderCard'
import OrderFilterBar from './OrderFilterBar'
import './orders.css'

const useStyles = makeStyles(() => ({
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
      setLoadingOrders(true)
      const res = isAdmin ? await getOrdersByStatus(orderStatusFilter, user.token) : await getOwnOrdersByStatus(orderStatusFilter, user.token)
      setOrders(res.data)
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
    }
    setLoadingOrders(false)
  }, [setOrders, orderStatusFilter, user.token, isAdmin])

  useEffect(() => { fetchFilteredOrders(orderStatusFilter) }, [fetchFilteredOrders, orderStatusFilter])

  const onSelectFilter = (e) => setOrderStatusFilter(e.target.value)

  const onSearchOrderById = async e => {
    e.preventDefault()
    try {
      setOrderStatusFilter("")
      const order = isAdmin ? await getOrderById(orderIdSearching, user.token) : await getOwnOrderById(orderIdSearching, user.token)
      if (isAdmin && !order.data.status) toast.error("No order by that Id exists")
      else {
        if (order.data._id) setOrders([order.data])
        else setOrders([])
      }
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error))
    }
  }

  const removeOrderFromList = (orderId) => {
    const newOrderList = orders.map(order => order._id !== orderId && order)
    setOrders(newOrderList)
  }

  return (
    <div className="page-frame">
      <BasicPaper>
        <div className={classes.pageHeader}>
          <Typography variant="h5" className={classes.pageTitle}>Manage Orders</Typography>
          <OrderFilterBar
            onSearchOrderById={onSearchOrderById}
            orderIdSearching={orderIdSearching}
            onSelectFilter={onSelectFilter}
            setOrderIdSearching={setOrderIdSearching}
            orderStatusFilter={orderStatusFilter} />
        </div>
        {loadingOrders && <div className="flex-center">
          <ProgressIndicator />
        </div>}
        {!loadingOrders &&
          <>
            {orders.length > 0 &&
              orders.map(order => order._id &&
                <OrderCard
                  key={order._id}
                  order={order}
                  loadingOrders={loadingOrders}
                  isAdmin={isAdmin}
                  user={user}
                  removeOrderFromList={removeOrderFromList}
                />).reverse()}
            {orders.length < 1 &&
              <Typography variant="body1" className={classes.pageHeader}>No orders found with selected parameters.</Typography>}
          </>
        }
      </BasicPaper>
    </div>
  )
}
export default ManageOrders