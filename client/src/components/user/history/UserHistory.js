import { CircularProgress, Typography, makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { getOrders } from '../../../apiCalls/user'
import BasicPaper from '../../common/paper/BasicPaper'
import OrderCard from './OrderCard'
import ManageOrders from '../../admin/ManageOrders'

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

const UserHistory = () => {
  // const classes = useStyles()
  // const user = useSelector(state => state.user)
  // const [orders, setOrders] = useState([])
  // const [loadingOrders, setLoadingOrders] = useState(true)

  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     const res = await getOrders(user.token)
  //     console.log(res.data)
  //     setOrders(res.data)
  //     setLoadingOrders(false)
  //   }
  //   asyncFunc()
  // }, [setOrders, user.token])

  return (
    <ManageOrders isAdmin={false} />
    // <div className="page-frame">
    //   {loadingOrders && <div className="flex-center">
    //     <CircularProgress />
    //   </div>}
    //   <div className="orders-holder">
    //     {!loadingOrders && <BasicPaper>
    //       <div className={classes.pageHeader}>
    //         <Typography variant="h5" className={classes.pageTitle}>Order History</Typography>
    //       </div>
    //       {orders.length > 0 && orders.map(order => <OrderCard order={order} key={order._id} />).reverse()}
    //       {orders.length < 1 && <Typography variant="body1">No orders yet...</Typography>}
    //     </BasicPaper>}
    //   </div>
    // </div>
  )
}
export default UserHistory