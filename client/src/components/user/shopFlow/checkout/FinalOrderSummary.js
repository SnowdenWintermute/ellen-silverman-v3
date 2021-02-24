import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectShippingAddress } from "../../../../apiCalls/user";
import { updateCartItems } from "../../../../store/actions/cart-actions"
import { Grid, Typography, Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { toast } from "react-toastify";
import ClearCartModal from './ClearCartModal'
import PrimaryButton from '../../../common/button/PrimaryButton'
import RedButton from '../../../common/button/RedButton'

const FinalOrderSummary = ({ cart, user, history, setSavingShippingAddressToCart }) => {
  const dispatch = useDispatch()
  const selectedAddress = useSelector(state => state.cart.selectedShippingAddress)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)

  const handleCancelOrder = async () => {
    try {
      await clearCart(user.token);
      localStorage.removeItem('cart')
      dispatch(updateCartItems([]))
      history.push("/artworks")
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error));
    }
  };

  const handleSubmitOrder = async () => {
    setSavingShippingAddressToCart(true) // you save it to the cart then the cart is used to create an order upon payment
    try {
      await selectShippingAddress(selectedAddress, user.token)
      history.push('/payment')
    } catch (error) {
      console.log(error)
      toast.error(JSON.stringify(error));
    }
    console.log("ey")
    setSavingShippingAddressToCart(false)
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">Order Summary</Typography>
        <Table style={{ marginBottom: 10 }} size="small">
          <TableBody>
            {cart.paintings &&
              cart.paintings.map((item) => (
                <TableRow key={item.painting.title}>
                  <TableCell>{item.painting.title}</TableCell>
                  <TableCell>${item.painting.price}</TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell>
                <strong>Total:</strong>
              </TableCell>
              <TableCell>
                <strong>${cart.cartTotal}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Grid item container justify="space-between">
          {user ? (
            <div className="checkout-main-buttons-holder">
              <RedButton onClick={() => setCancelModalOpen(true)} title="CANCEL ORDER" />
              <PrimaryButton
                title="SUBMIT ORDER"
                onClick={handleSubmitOrder}
                disabled={!selectedAddress}
              />
            </div>
          ) : (
              <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
                <PrimaryButton
                  title="Log in to check out"
                  outlined
                />
              </Link>
            )}
        </Grid>
      </Grid>
      <ClearCartModal
        open={cancelModalOpen}
        handleClose={() => setCancelModalOpen(false)}
        handleCancelOrder={handleCancelOrder}
        history={history}
      />
    </>
  )
}
export default FinalOrderSummary