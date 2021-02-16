export const UPDATE_CART = "UPDATE_CART";
export const SET_SELECTED_SHIPPING_ADDRESS = "SET_SELECTED_SHIPPING_ADDRESS";

export const updateCartItems = (newCartItems) => {
  return {
    type: UPDATE_CART,
    payload: newCartItems,
  };
};

export const setSelectedShippingAddress = (addressId) => {
  return {
    type: SET_SELECTED_SHIPPING_ADDRESS,
    payload: addressId,
  };
};