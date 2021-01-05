export const UPDATE_CART = "UPDATE_CART";

export const updateCart = (newCart) => {
  return {
    type: UPDATE_CART,
    payload: newCart,
  };
};