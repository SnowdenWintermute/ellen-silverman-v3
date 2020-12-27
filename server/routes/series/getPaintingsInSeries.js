const Painting = require('../../models/painting')
const Series = require('../../models/series')

exports.getPaintingsInSeries = async (req, res) => {
  const { seriesSlug } = req.params
  console.log(seriesSlug)
  try {
    const series = await Series.findOne({ slug: seriesSlug })
    const paintingsInSeries = await Painting.find({ series: series._id }).select("-image")
    return res.status(200).json(paintingsInSeries)
  } catch (error) {
    return res.status(400).error("Painting search failed")
  }
};