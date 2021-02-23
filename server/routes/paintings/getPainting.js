const Painting = require("../../models/painting")

// used for cart, checkout etc (places you only need thumbnail)
exports.get = async (req, res) => {
  try {
    const paintingToReturn = await Painting.findOne({ slug: req.params.slug }).select("-image")
    return res.json(paintingToReturn)
  } catch (error) {
    return res.status(400).json(error)
  }
}