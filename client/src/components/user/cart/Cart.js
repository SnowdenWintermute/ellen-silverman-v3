import { CircularProgress, Grid, Icon, IconButton, Paper, Table, TableBody, TableCell, TableRow, Typography, Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPaintingThumbnail } from '../../../apiCalls/paintings'
import { makeStyles } from '@material-ui/styles'
import createImgSrcStringFromBinary from '../../utils/createImgSrcStringFromBinary'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import BasicPaper from '../../common/paper/BasicPaper'
import { updateCart } from "../../../store/actions/cart-actions";

import { saveCart } from '../../../apiCalls/user'

const useStyles = makeStyles({
  checkoutButton: {
    marginLeft: 16
  },
  summaryTable: {
    marginBottom: 10
  }
})

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    console.log(Object.prototype.toString.call(cart) === '[object Array]')
    console.log(cart)
    if (!cart.length) return
    const promises = []
    const newCart = [...cart]
    newCart.forEach((item) => {
      promises.push(new Promise((resolve, reject) => getPaintingThumbnail(item._id).then(thumbnail => {
        item.thumbnail = thumbnail.data
        resolve()
      })))
    })
    Promise.all(promises).then(result => {
      setCartItems(newCart)
    })
  }, [cart])

  const removeItemFromCart = (id) => {
    let newCart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.forEach(item => {
          if (item._id !== id) newCart.push({ ...item })
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch(updateCart(newCart))
        setCartItems(newCart)
      }
    }
  }

  const saveOrderToDb = async () => {
    const cartItemIdsAndQuantities = []
    cartItems.forEach(item => cartItemIdsAndQuantities.push({ id: item._id, quantity: 1 }))
    console.log(JSON.stringify(cartItemIdsAndQuantities, null, 2))
    try {
      const response = await saveCart(cartItemIdsAndQuantities, user.token)
      console.log("cart post response: ", response)
      if (response.data.ok) history.push('/checkout')
    } catch (error) {
      console.log("cart save error: ", error)
    }
  }

  return (
    <div className="page-frame">
      <BasicPaper>
        <Grid container>
          <Grid container item xs={12} sm={8}>
            <Grid item xs={12}>
              <Typography variant="h5">Cart</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableBody>
                  {cart.length ? cart.map(item => <TableRow key={item._id}>
                    <TableCell>
                      {item.thumbnail ? <img style={{ height: "100px", border: "1px solid black" }} alt={item.title} src={createImgSrcStringFromBinary(item.thumbnail.contentType, item.thumbnail.data)} /> : <CircularProgress />}
                    </TableCell>
                    <TableCell>
                      <ul style={{ listStyle: "none" }}>
                        <li>
                          <Link className="cart-item-link" target="_blank" to={`/artworks/${item.series.slug}/${item.slug}`}>{item.title}</Link>
                        </li>
                        <li>
                          {`${item.height}" x ${item.width}"`}
                        </li>
                        <li>
                          {`${item.drawingMaterial} on ${item.support}`}
                        </li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      ${item.price}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeItemFromCart(item._id)}>
                        <Icon>
                          <RemoveShoppingCartIcon />
                        </Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>) :
                    <>
                      <TableRow>
                        <TableCell>
                          No items in cart
                  </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Link className="standard-link underlined" to="/artworks">Browse Artworks</Link>
                        </TableCell>
                      </TableRow>
                    </>
                  }
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={4}>
            <Grid item xs={12}>
              <Typography variant="h5">Order Summary</Typography>
              <Table className={classes.summaryTable} size="small">
                <TableBody>
                  {cart.length > 0 && cart.map(item =>
                    <TableRow key={item.title}>
                      <TableCell>
                        {item.title}
                      </TableCell>
                      <TableCell>
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell><strong>Subtotal:</strong></TableCell>
                    <TableCell><strong>${cart.length && cart.reduce((totalPrice, item) => { return totalPrice + parseInt(item.price) }, 0)}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {user ?
                <Button className={classes.checkoutButton} onClick={saveOrderToDb} disabled={cartItems.length < 1} variant="contained" color="primary">CHECK OUT</Button> :
                <Link className={classes.checkoutButton} to={{ pathname: '/login', state: { from: 'cart' } }}>
                  <Button variant="outlined" color="primary">
                    Log in to check out
                    </Button>
                </Link>}
            </Grid>
          </Grid>
        </Grid>
      </BasicPaper>
    </div>
  )
}
export default Cart