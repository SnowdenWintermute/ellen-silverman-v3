import axios from "axios";

export const createPage = async (title, authToken) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/pages`, { title }, {
    headers: {
      authToken,
    },
  })
  return res
}

export const getPage = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/pages/${slug}`)
}

export const incrementPageViewCounter = async (slug) => await axios.put(`${process.env.REACT_APP_API}/pages/${slug}`)