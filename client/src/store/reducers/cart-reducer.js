let initialState = {
  items: [],
  selectedShippingAddress: ""
}

if (typeof window !== "undefined") {
  if (localStorage.getItem('cart')) {
    initialState.items = JSON.parse(localStorage.getItem('cart'))
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return { ...state, items: [...action.payload] };
    case "SET_SELECTED_SHIPPING_ADDRESS":
      return { ...state, selectedShippingAddress: action.payload }
    default:
      return state
  }
}
export default cart