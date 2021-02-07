const Series = require('../../models/series')
const slugify = require("slugify");

exports.create = (req, res) => {
  new Series({ name: req.body.name, slug: slugify(req.body.name) })
    .save()
    .then(newSeries => res.json(newSeries))
    .catch(error => {
      if (error.code === 11000) return res.status(400).json({ message: "Duplicate entry" })
      return res.status(400).json(error)
    })
};