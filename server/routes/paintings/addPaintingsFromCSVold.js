const Painting = require('../../models/painting');
const Series = require('../../models/series')
const formidable = require('formidable');
const slugify = require("slugify");
const csvtojson = require("csvtojson/v2");

// assign a slug
// fetch series id
// check if painting exists
// update or save new painting
// send errors
// send successful upload info

exports.addPaintingsFromCSV = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  const errors = []
  const paintingsAdded = []
  form.parse(req, async (err, fields, files) => {
    const promises = []
    if (err) {
      errors.push(err)
    }
    if (files) {
      if (files.csv) {
        const converter = csvtojson({ trim: true, noheader: false, })
        converter.fromFile(files.csv.path).then(convertedCSV => {
          convertedCSV.forEach(painting => {
            // coerce booleans
            if (painting.sold.toLowerCase() === "true") painting.sold = true
            else painting.sold = false
            // slug up
            painting.slug = slugify(painting.title)
            // look up series
            if (painting.series) {
              promises.push(
                Series.findOne({ name: painting.series }).then(seriesFound => {
                  painting.series = seriesFound._id
                  Painting.findOne({ title: painting.title }).then((paintingFound) => {
                    if (paintingFound) {
                      paintingFound = { ...painting }
                      paintingFound.save().then(paintingUpdated => {
                        console.log("updated: ", paintingUpdated.title)
                      }).catch(err => errors.push(err))
                    } else {
                      new Painting(painting).save().then(savedPainting => {
                        // console.log(savedPainting)
                        paintingsAdded.push(savedPainting)
                        console.log(paintingsAdded)
                      }).catch(err => {
                        errors.push(err)
                      })
                    }
                  }).catch(err => errors.push(err))
                }).catch(err => errors.push(err))
              )
            }
          })
          Promise.all(promises).then(() => {
            console.log("successfully saved: ", paintingsAdded)
            console.log("errors:", errors)
          })
        }).catch(err => {
          errors.push(err)
        })
      }
    }
  })

  return res.json([{ "dummy-text": "oyyy" }])
}