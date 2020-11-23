import { SET_NAV_HEIGHT } from "../actions/nav-actions";

const initialState = {
  height: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_HEIGHT:
      return {
        height: action.height,
      };
    default:
      return state;
  }
};
