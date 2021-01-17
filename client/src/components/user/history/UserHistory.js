import { CircularProgress, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getOrders } from '../../../apiCalls/user'
import BasicPaper from '../../common/paper/BasicPaper'
import OrderCard from './OrderCard'

const UserHistory = () => {
  const user = useSelector(state => state.user)
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    const asyncFunc = async () => {
      const res = await getOrders(user.token)
      console.log(res.data)
      setOrders(res.data)
      setLoadingOrders(false)
    }
    asyncFunc()
  }, [setOrders, user.token])

  return (
    <div className="page-frame">
      {loadingOrders && <div className="flex-center">
        <CircularProgress />
      </div>}
      <div className="orders-holder">
        {!loadingOrders && <BasicPaper>
          <Typography variant="h5">Order History</Typography>
          {orders.length > 0 && orders.map(order => <OrderCard order={order} key={order._id} />).reverse()}
          {orders.length < 1 && <Typography variant="body1">No orders yet...</Typography>}
        </BasicPaper>}
      </div>
    </div>
  )
}
export default UserHistory