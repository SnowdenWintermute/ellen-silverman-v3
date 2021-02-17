const Page = require("../../models/page");
const incrementVeiwableObjectViewCounter = require("../utils/incrementVeiwableObjectViewCounter");

exports.incrementPageViewCounter = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug }).populate("viewCounter");
    incrementVeiwableObjectViewCounter(page, req.ip);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
