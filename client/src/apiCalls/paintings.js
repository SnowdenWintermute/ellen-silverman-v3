import axios from 'axios'

export const addPainting = async (painting, authToken) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/paintings`, painting, {
      headers: {
        authToken,
        'Content-Type': `multipart/form-data; boundary=${painting._boundary}`
      }
    })
    return res
  } catch (err) {
    return err
  }
};