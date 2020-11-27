export const SET_NAV_HEIGHT = "SET_NAV_HEIGHT";
export const TOGGLE_USER_MENU = "TOGGLE_USER_MENU";

export const setNavHeight = (height) => {
  return {
    type: SET_NAV_HEIGHT,
    height,
  };
};

export const toggleUserMenu = (payload) => {
  return {
    type: TOGGLE_USER_MENU,
    payload
  }
}