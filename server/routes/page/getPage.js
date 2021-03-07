const Page = require("../../models/page");

exports.getPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug }).populate("viewCounter");
    res.json(page);
  } catch (error) {
    res.json(error);
  }
};
