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

export const addSeries = async (series, authToken) => {
  console.log(series)
  try {
    const addedSeries = await axios.post(`${process.env.REACT_APP_API}/series`, series, {
      headers: {
        authToken
      }
    })
    return addedSeries.data
  } catch (err) {
    console.log(err)
    return err
  }
}