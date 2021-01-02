const Painting = require("../../models/painting");

exports.getThumbnail = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id).select('thumbnail')
    return res.json(painting.thumbnail)
  } catch (error) {
    return res.json(error)
  }
}