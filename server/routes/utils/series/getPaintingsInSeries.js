const Painting = require("../../../models/painting")

module.exports = async (seriesId) => {
  try {
    const paintingsInSeries = await Painting.find({ series: seriesId })
    console.log("getPaintingsInSeries: ", seriesId, paintingsInSeries)
    return paintingsInSeries
  } catch (error) {
    console.log(error)
    return error
  }
}