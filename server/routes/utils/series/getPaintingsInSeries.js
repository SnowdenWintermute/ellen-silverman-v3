const Painting = require("../../../models/painting")

// used to find all paintings in a series to be removed when removing a series
module.exports = async (seriesId) => {
  try {
    const paintingsInSeries = await Painting.find({ series: seriesId })
    return paintingsInSeries
  } catch (error) {
    console.log(error)
    return error
  }
}