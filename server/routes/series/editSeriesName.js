const Series = require('../../models/series')

exports.editSeriesName = async (req, res) => {
  try {
    seriesToBeEdited = await Series.findById(req.body.seriesId)
    const seriesAlreadyWithThatName = await Series.findOne({ name: req.body.newSeriesName })
    if (seriesAlreadyWithThatName) return res.status(400).json({ error: "A series by that name already exists" })
    seriesToBeEdited.name = req.body.newSeriesName
    await seriesToBeEdited.save()
    return res.status(200).json(seriesToBeEdited)
  } catch (error) {
    return res.status(400).json(error)
  }
}