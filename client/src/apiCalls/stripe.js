import axios from 'axios'

export const createPaymentIntent = async (authToken) => await axios.post(`${process.env.REACT_APP_API}/stripe/create-payment-intent`,
  {},
  {
    headers: {
      authToken
    }
  })