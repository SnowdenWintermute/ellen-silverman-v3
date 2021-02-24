import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '../../../apiCalls/stripe'
import { createOrder, clearCart } from '../../../apiCalls/user'
import { Button } from '@material-ui/core'
import { updateCartItems } from "../../../store/actions/cart-actions"
import { toast } from 'react-toastify'

export const StripeWidget = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState("")

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const response = await createPaymentIntent(user.token)
        setClientSecret(response.data.clientSecret)
      } catch (error) {
        console.log(error)
      }
    }
    asyncFunc()
  }, [user])

  const handleSuccess = async (payload) => {
    setError(null)
    setProcessing(false)
    setSucceeded(true)
    try {
      await createOrder(payload, user.token)
      await clearCart(user.token);
      localStorage.removeItem('cart')
      dispatch(updateCartItems([]))
      toast.success("Order paid and saved")
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: e.target.name.value
          }
        }
      })
      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`)
      } else {
        handleSuccess(payload)
      }
    } catch (error) {
      console.log(error)
    }
    setProcessing(false)
  };

  const handleChange = async (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Roboto, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        backgroundColor: "white",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
        height: 70,
        backgroundColor: "white"
      },
    },
  };

  return (
    <>
      {succeeded && <p className={"result-message"}>
        Payment successful.{" "}
        <Link className="standard-link underlined" to="user/history">
          See it in your purchase history
           </Link>
      </p>}
      {!succeeded && <form id="payment-form" onSubmit={handleSubmit}>
        {error && error}
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10, width: "100%" }}
          disabled={processing || disabled || succeeded}
          type="submit"
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </Button>
      </form>}
    </>
  )
}
export default StripeWidget