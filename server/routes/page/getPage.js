const Page = require("../../models/page");

exports.getPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug }).populate("viewCounter");
    if(page)res.json(page);
    else res.json(false)
  } catch (error) {
    res.json(error);
  }
};
