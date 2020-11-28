import axios from "axios"

export const getSeriesList = async () => {
  try {
    const fetchedSeries = await axios.get(`${process.env.REACT_APP_API}/series/list`)
    return fetchedSeries.data
  } catch (err) {
    console.log(err)
    return err
  }
}