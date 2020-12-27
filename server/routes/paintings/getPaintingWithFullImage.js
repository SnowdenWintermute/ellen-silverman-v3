const Painting = require("../../models/painting");

exports.getFull = async (req, res) => {
  try {
    const paintingToReturn = await Painting.findOne({
      slug: req.params.slug,
    }).populate("series");
    return res.json(paintingToReturn);
  } catch (error) {
    return res.status(400).json(error);
  }
};
