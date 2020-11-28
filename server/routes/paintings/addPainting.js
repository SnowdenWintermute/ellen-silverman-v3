const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Painting = require('../../models/painting');
const slugify = require("slugify");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: err
      });
    }

    console.log("todo- add slug to fields")
    console.log(fields)

    let painting = new Painting(fields);

    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: 'Image should be less than 3mb in size'
        });
      }
      painting.photo.data = fs.readFileSync(files.photo.path);
      painting.photo.contentType = files.photo.type;
    }

    painting.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    });
  });
};