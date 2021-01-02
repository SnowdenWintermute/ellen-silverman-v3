import axios from 'axios'

export const saveCart = async (cartItemIdsAndQuantities, authToken) => await axios.post(`${process.env.REACT_APP_API}/user/cart`, { cartItemIdsAndQuantities }, {
  headers: {
    authToken
  }
})