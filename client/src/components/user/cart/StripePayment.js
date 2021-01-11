import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Typography } from '@material-ui/core'
import BasicPaper from '../../common/paper/BasicPaper'
import StripeWidget from './StripeWidget'

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const StripePayment = () => {
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
    <div className="page-frame">
      <BasicPaper>
        <Typography>Complete purchase</Typography>
        <Elements stripe={promise}>
          <StripeWidget />
        </Elements>
      </BasicPaper>
    </div>
  )
}
export default StripePayment