const Series = require('../../models/series')
const Paintings = require('../../models/painting')

// return a list of all series with the number of paintings in each one
exports.list = async (req, res) => {
  try {
    const seriesList = await Series.find({}).sort({ createdAt: -1 }).populate('viewCounter').exec()
    const listToReturn = []
    let i = 0
    for (const series of seriesList) {
      listToReturn.push({ ...series._doc })
      try {
        const numberOfPaintingsInSeries = await Paintings.countDocuments({ seriesList: series._id })
        listToReturn[i].numberOfPaintings = numberOfPaintingsInSeries
      } catch (error) {
        listToReturn[i].numberOfPaintings = 0
      }
      i++
    }
    res.json(listToReturn);
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}
