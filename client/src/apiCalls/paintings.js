
import axios from 'axios'

export const addPainting = async (painting, authToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/paintings`, painting, {
      headers:
        authToken
    })
    return res
  } catch (err) {
    console.log(err)
    return err
  }
};