import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '../../../apiCalls/stripe'

export const StripeWidget = ({ history }) => {
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
        console.log(response.data.clientSecret)
      } catch (error) {
        console.log(error)
      }
    }
    asyncFunc()
  }, [user])

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
        console.log(JSON.stringify(payload, null, 2))
        setError(null)
        setProcessing(false)
        setSucceeded(true)
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
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {succeeded && <p className={"result-message"}>Payment successful. <Link className="standard-link underlined" to="user/history">See it in your purchase history</Link></p>}
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        {error && error}
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
    </>
  )
}
export default StripeWidget