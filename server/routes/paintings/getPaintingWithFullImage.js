const Painting = require("../../models/painting");
const incrementVeiwableObjectViewCounter = require("../utils/incrementVeiwableObjectViewCounter");

exports.getFull = async (req, res) => {
  try {
    const paintingToReturn = await Painting.findOne({
      slug: req.params.slug,
    }).populate("series viewCounter");
    await incrementVeiwableObjectViewCounter(paintingToReturn, req.ip);
    return res.json(paintingToReturn);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
