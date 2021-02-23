const Series = require('../../models/series')

exports.getSeries = async (req, res) => {
  try {
    const series = await Series.findById(req.params.seriesId)
    return res.json(series)
  } catch (error) {
    console.log(error)
    return res.json(JSON.stringify(error))
  }
}
