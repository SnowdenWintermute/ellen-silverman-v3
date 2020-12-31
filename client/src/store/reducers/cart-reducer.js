let initialState = []

if (typeof window !== "undefined") {
  if (localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem('cart'))
  } else initialState = []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return action.payload;
    default:
      return state
  }
}