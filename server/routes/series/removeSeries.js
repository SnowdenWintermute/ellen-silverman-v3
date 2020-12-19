const Series = require('../../models/series')
const Painting = require('../../models/painting')
const getPaintingsInSeries = require('../utils/series/getPaintingsInSeries')

exports.remove = async (req, res) => {
  try {
    console.log(req.body)
    const { seriesName } = req.body
    const seriesToBeDeleted = await Series.findOne({ name: seriesName })
    console.log("seriesToBeDeleted", seriesToBeDeleted)
    const paintingsInSeriesToBeDeleted = await getPaintingsInSeries(seriesToBeDeleted._id)
    for (const painting of paintingsInSeriesToBeDeleted) {
      await painting.remove()
    }
    await seriesToBeDeleted.remove()
    return res.json(`${seriesName} and all associated paintings removed from database`)
  } catch (error) {
    res.status(400).json(error)
    console.log(error)
  }
};
