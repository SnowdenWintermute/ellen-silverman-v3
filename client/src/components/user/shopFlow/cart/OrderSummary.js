import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { toast } from 'react-toastify'
import { saveCart } from '../../../../apiCalls/user'
import PrimaryButton from '../../../common/button/PrimaryButton'

const useStyles = makeStyles({
  checkoutButton: {
    marginLeft: 16
  },
  summaryTable: {
    marginBottom: 10
  }
})

const OrderSummary = ({ cart }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.user)
  const history = useHistory()

  const saveOrderToDb = async () => {
    const cartItemIdsAndQuantities = []
    // would have to modify this to enable purchasing multiple of same item
    cart.items.forEach(item => cartItemIdsAndQuantities.push({ id: item._id, quantity: 1 }))
    try {
      const response = await saveCart(cartItemIdsAndQuantities, user.token)
      if (response.data.ok) history.push('/checkout')
    } catch (error) {
      console.log("cart save error: ", error)
      toast.error("Database error: " + JSON.stringify(error))
    }
  }

  return (
    <Grid item xs={12}>
      <Typography variant="h5">Order Summary</Typography>
      <Table className={classes.summaryTable} size="small">
        <TableBody>
          {cart.items.length > 0 && cart.items.map(item =>
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
            <TableCell>
              <strong>${cart.items.length &&
                cart.items.reduce((totalPrice, item) => { return totalPrice + parseInt(item.price) }, 0)}
              </strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {user ?
        <PrimaryButton
          title="CHECK OUT"
          onClick={saveOrderToDb}
          customClasses={classes.checkoutButton}
          disabled={cart.items.length < 1}
        /> :
        <Link
          className={classes.checkoutButton}
          to={{ pathname: '/login', state: { from: 'cart' } }}>
          <PrimaryButton
            title="Log in to check out"
            outlined
          />
        </Link>}
    </Grid>
  )
}
export default OrderSummary