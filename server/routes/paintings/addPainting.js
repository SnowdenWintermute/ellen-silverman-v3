const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Painting = require('../../models/painting');
const slugify = require("slugify");
const parseFormFieldsAndFiles = require('../utils/parseFormFieldsAndFiles');
const sharp = require('sharp');
const updateSeriesMetadata = require('../utils/series/updateSeriesMetadata')

exports.create = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    const parsedForm = await parseFormFieldsAndFiles(req)
    let painting = new Painting(parsedForm.fields);
    if (parsedForm.files.image) {
      painting.image.data = fs.readFileSync(parsedForm.files.image.path);
      painting.image.contentType = parsedForm.files.image.type;
      const thumbnail = await sharp(painting.image.data)
        .resize({ width: 500 })
        .toBuffer()
      painting.thumbnail.data = thumbnail
      painting.thumbnail.contentType = parsedForm.files.image.type
    }
    if (painting.title) {
      painting.slug = slugify(painting.title)
      painting.title_lower = painting.title.toLowerCase()
    }
    painting.save().then((result) => {
      console.log("Painting added")
      updateSeriesMetadata(painting.series)
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

  } catch (err) {
    return res.status(400).json({ error: err })
  }
};