export const UPDATE_CART = "UPDATE_CART";

export const addToCart = (newCart) => {
  return {
    type: UPDATE_CART,
    payload: newCart,
  };
};