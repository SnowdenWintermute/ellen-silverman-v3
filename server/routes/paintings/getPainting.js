const Painting = require("../../models/painting")

exports.get = async (req, res) => {
  console.log(req.params.slug)
  try {
    const paintingToReturn = await Painting.findOne({ slug: req.params.slug }).select("-image")
    return res.json(paintingToReturn)
  } catch (error) {
    return res.status(400).json(error)
  }
}