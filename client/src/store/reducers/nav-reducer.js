import { SET_NAV_HEIGHT } from "../actions/nav-actions";
import { TOGGLE_USER_MENU } from "../actions/nav-actions";

const initialState = {
  height: 0,
  showUserMenu: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_HEIGHT:
      return {
        ...state,
        height: action.height,
      };
    case TOGGLE_USER_MENU:
      return {
        ...state,
        showUserMenu: action.payload
      }
    default:
      return state;
  }
};
