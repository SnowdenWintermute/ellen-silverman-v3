import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { toast } from 'react-toastify'
import { getPaintingThumbnail } from '../../../../apiCalls/paintings'
import CartItems from './CartItems'
import OrderSummary from './OrderSummary'
import BasicPaper from '../../../common/paper/BasicPaper'
import './cart.css'

const Cart = () => {
  const [cartItemsWithThumbnails, setCartItemsWithThumbnails] = useState([])
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    const promises = []
    const newCartItems = [...cart.items]
    newCartItems.forEach((item) => {
      promises.push(new Promise((resolve, reject) => getPaintingThumbnail(item._id).then(thumbnail => {
        item.thumbnail = thumbnail.data
        resolve()
      }).catch(error => reject(error))
      ))
    })
    Promise.all(promises).then(() => {
      setCartItemsWithThumbnails(newCartItems)
    }).catch(error => toast.error(JSON.stringify(error)))
  }, [cart])

  return (
    <div className="page-frame">
      <BasicPaper>
        <Grid container>
          <Grid container item xs={12} sm={8}>
            <Grid item xs={12}>
              <Typography variant="h5">Cart</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <CartItems cartItemsWithThumbnails={cartItemsWithThumbnails} />
            </Grid>
          </Grid>
          <Grid container item md={4} xs={12}>
            <OrderSummary cart={cart} />
          </Grid>
        </Grid>
      </BasicPaper>
    </div>
  )
}
export default Cart