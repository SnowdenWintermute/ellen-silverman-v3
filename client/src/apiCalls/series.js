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

export const fetchOneSeriesPaintingsNames = async (seriesId) => {
  try {
    const fetchedSeries = await axios.get(`${process.env.REACT_APP_API}/series/list-paintings/${seriesId}`)
    return fetchedSeries.data
  } catch (err) {
    console.log(err)
    return err
  }
}

export const addSeries = async (series, authToken) => {
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

export const editSeries = async (seriesId, newSeriesName, authToken) => {
  try {
    const editedSeries = await axios.put(`${process.env.REACT_APP_API}/series`, { seriesId, newSeriesName }, {
      headers: {
        authToken
      }
    })
    return editedSeries
  } catch (error) {
    console.log(error)
    return error
  }
}

export const removeSeries = async (seriesName, authToken) => {
  try {
    const deletedSeries = await axios.delete(`${process.env.REACT_APP_API}/series`, {
      headers: {
        authToken
      },
      data: {
        seriesName
      }
    })
    return deletedSeries
  } catch (err) {
    console.log(err)
    return err
  }
}