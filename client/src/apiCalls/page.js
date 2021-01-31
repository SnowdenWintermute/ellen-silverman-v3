import axios from "axios";

export const createPage = async (title, authToken) => await axios.post(`${process.env.REACT_APP_API}/pages`,
  { title },
  {
    headers: {
      authToken,
    },
  })


export const getPage = async (slug) => await axios.get(`${process.env.REACT_APP_API}/pages/${slug}`)


export const incrementPageViewCounter = async (slug) => await axios.put(`${process.env.REACT_APP_API}/pages/${slug}`)