import axios from "axios";
export const CREATE_OR_UPDATE_USER = "CREATE_OR_UPDATE_USER"
export const LOAD_USER = "LOAD_USER"

export const createOrUpdateUser = (authtoken) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
    console.log(res)
    dispatch({ type: LOAD_USER, payload: res.data })
  } catch (err) {
    console.log(err)
    return err
  }
};