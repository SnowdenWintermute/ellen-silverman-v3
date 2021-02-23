const Series = require('../../models/series')
const getPaintingsInSeries = require('../utils/series/getPaintingsInSeries')

exports.remove = async (req, res) => {
  try {
    const { seriesName } = req.body
    const seriesToBeDeleted = await Series.findOne({ name: seriesName })
    const paintingsInSeriesToBeDeleted = await getPaintingsInSeries(seriesToBeDeleted._id)
    for (const painting of paintingsInSeriesToBeDeleted) {
      await painting.remove()
    }
    await seriesToBeDeleted.remove()
    return res.json(`${seriesName} and all associated paintings removed from database`)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
};
