import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { getCart } from "../../../apiCalls/user";
import BasicPaper from '../../common/paper/BasicPaper'
import StripeWidget from './StripeWidget'
// import PayPalWidget from './PayPalWidget'

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = ({ history }) => {
  const user = useSelector(state => state.user)
  const [cart, setCart] = useState({})
  // const [paymentMethod, setPaymentMethod] = useState("card")

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const cartFromDatabase = await getCart(user.token);
        if (!cartFromDatabase.data.userCart) {
          history.push("/cart")
        }
        setCart(cartFromDatabase.data.userCart);
      } catch (error) {
        toast.error(error);
      };
    }
    asyncFunc();
  }, [user, history]);

  const selectedPaymentPortalElement = () => {
    // if (paymentMethod === "card") {
    return (<Elements stripe={promise}>
      <StripeWidget />
    </Elements>)
    // } 
    // else if (paymentMethod === "paypal") {
    //   return (
    //     <PayPalWidget cart={cart} />
    //   )
    // }
  }

  return (
    <div className="page-frame">
      <BasicPaper>
        <Typography variant="h5">Complete purchase</Typography>
        <Typography variant="body1" style={{ marginBottom: 10 }}>Total: ${cart.cartTotal}</Typography>
        {/* <Typography variant="body2" style={{ marginBottom: 10 }}>Select payment method:</Typography> */}
        {/* <ul style={{ listStyle: "none", display: "flex", marginBottom: 10 }}>
          <li style={{ marginRight: 10 }}>
            <Button onClick={() => setPaymentMethod("card")} variant={paymentMethod === "card" ? "contained" : "outlined"} color="primary">Credit Card</Button>
          </li>
          <li style={{ marginRight: 10 }}>
            <Button onClick={() => setPaymentMethod("paypal")} variant={paymentMethod === "paypal" ? "contained" : "outlined"} color="primary">PayPal</Button>
          </li>
        </ul> */}
        {selectedPaymentPortalElement()}
      </BasicPaper>
    </div>
  )
}
export default Payment