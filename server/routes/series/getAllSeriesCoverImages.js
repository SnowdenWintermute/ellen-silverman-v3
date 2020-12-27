const Series = require('../../models/series')
const Painting = require('../../models/painting');
const series = require('../../models/series');

exports.getSeriesWithThumbnails = async (req, res) => {
  console.log("Requested series with thumbnails")
  const seriesToReturn = []
  try {
    const allSeries = await Series.find()
    console.log(allSeries)
    for (const series of allSeries) {
      const thumbnail = await Painting.findOne({ series: series._id }).select("thumbnail") || null
      const thumbnailToSend = thumbnail ? { ...thumbnail._doc } : {}
      if (Object.keys(thumbnailToSend).length > 0) seriesToReturn.push({ ...series._doc, ...thumbnailToSend })
    }
    console.log(seriesToReturn)
    return res.status(200).json(seriesToReturn)
  } catch (error) {
    console.log(error)
    return res.status(400).error("Series search failed")
  }
};