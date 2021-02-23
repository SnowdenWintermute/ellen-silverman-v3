const Series = require('../../models/series')
const Painting = require('../../models/painting');

exports.getSeriesWithThumbnails = async (req, res) => {
  const seriesToReturn = []
  try {
    const allSeries = await Series.find().populate('viewCounter')
    for (const series of allSeries) {
      const firstPaintingInSeries = await Painting.findOne({ series: series._id, thumbnail: { $ne: null } }) || null
      if (firstPaintingInSeries) {
        const thumbnail = { ...firstPaintingInSeries.thumbnail }
        const thumbnailToSend = thumbnail ? thumbnail : {}
        if (thumbnailToSend.data !== undefined) seriesToReturn.push({ ...series._doc, thumbnail: { ...thumbnailToSend } })
      }
    }
    return res.status(200).json(seriesToReturn)
  } catch (error) {
    console.log(error)
    return res.status(400).error("Series search failed")
  }
};