import axios from "axios";

export const saveCart = async (cartItemIdsAndQuantities, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cartItemIdsAndQuantities },
    {
      headers: {
        authToken,
      },
    }
  );

export const getCart = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });

export const clearCart = async (authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });

export const lookupNewAddress = async (address, authToken) => await axios.post(`${process.env.REACT_APP_API}/user/address`, { address }, {
  headers: {
    authToken,
  },
})

export const getUserAddresses = async (authToken) => await axios.get(`${process.env.REACT_APP_API}/user/address`, {
  headers: {
    authToken,
  },
})

export const confirmNewAddress = async (addressId, authToken) => await axios.put(`${process.env.REACT_APP_API}/user/address`, { addressId }, {
  headers: {
    authToken,
  },
})

export const selectShippingAddress = async (addressId, authToken) => await axios.put(`${process.env.REACT_APP_API}/user/address/select`, { addressId }, {
  headers: {
    authToken,
  },
})

export const removeAddress = async (addressIdToRemove, authToken) => await axios.put(`${process.env.REACT_APP_API}/user/address/remove`, { addressIdToRemove }, {
  headers: {
    authToken,
  },
})

export const createOrder = async (stripeResponse, authToken) => await axios.post(`${process.env.REACT_APP_API}/user/order`, { stripeResponse }, {
  headers: {
    authToken,
  },
})

export const getOwnOrdersByStatus = async (status, authToken) => await axios.get(`${process.env.REACT_APP_API}/user/order/${status}`, {
  headers: {
    authToken,
  },
})

export const getOwnOrderById = async (orderId, authToken) => await axios.get(`${process.env.REACT_APP_API}/user/order/id/${orderId}`, {
  headers: {
    authToken,
  },
})

export const submitReturnRequest = async (orderId, selectedPaintings, returnNotes, authToken) => await axios.put(`${process.env.REACT_APP_API}/user/order/return`,
  { orderId, selectedPaintings, returnNotes },
  {
    headers: {
      authToken,
    },
  })

export const cancelOrder = async (orderId, authToken) => await axios.put(`${process.env.REACT_APP_API}/user/order/cancel`,
  { orderId },
  {
    headers: {
      authToken,
    },
  })