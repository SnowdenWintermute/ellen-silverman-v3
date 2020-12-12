const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Painting = require('../../models/painting');
const slugify = require("slugify");

exports.create = (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }

      let painting = new Painting(fields);

      if (painting.title) {
        painting.slug = slugify(painting.title)
        painting.title_lower = painting.title.toLowerCase()
      }
      painting.save().then((result) => {
        console.log("Painting added")
        res.json(result);
      }).catch(err => {
        console.log(err)
        if (err.code) {
          if (err.code === 11000) return res.status(400).json({ error: { message: "Duplicate named entry found in database." } })
        }
        return res.status(400).json({
          error: err
        });
      })
    });
  } catch (err) {
    return res.status(400).json({ error: err })
  }
};