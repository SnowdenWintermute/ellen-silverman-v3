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
