const Painting = require('../../models/painting')

exports.listPaintingsInSeries = async (req, res) => {
  const { seriesId } = req.params
  try {
    const paintingsInSeries = await Painting.find({ series: seriesId }).select("title _id slug viewCounter").populate("viewCounter")
    return res.status(200).json(paintingsInSeries)
  } catch (error) {
    return res.status(400).error("Painting list search failed")
  }
};