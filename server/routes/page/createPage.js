const Page = require("../../models/page");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const newPage = new Page();
    newPage.title = req.body.title;
    newPage.slug = slugify(req.body.title);
    await newPage.save();
    res.json("page created");
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
