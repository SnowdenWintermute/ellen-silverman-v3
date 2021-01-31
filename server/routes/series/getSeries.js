const Series = require('../../models/series')

// return a list of all series with the number of paintings in each one
exports.getSeries = async (req, res) => {
  try {
    const series = await Series.findById(req.params.seriesId)
    return res.json(series)
  } catch (error) {
    console.log(error)
    return res.json(JSON.stringify(error))
  }
}
