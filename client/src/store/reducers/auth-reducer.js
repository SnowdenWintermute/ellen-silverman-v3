import {
  LOAD_USER
} from "../actions/auth-actions";

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
