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