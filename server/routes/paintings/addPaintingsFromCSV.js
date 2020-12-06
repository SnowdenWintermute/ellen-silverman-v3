const series = require('../../models/series')

parseFiles = require('../utils/parseFiles')
convertCSVtoJSON = require('../utils/convertCSVtoJSON')
const Painting = require('../../models/painting');
const Series = require('../../models/series')
const slugify = require("slugify");

// parse form for csv file
// convert csv to json
// for each painting
//  fetch series' ids
//  assign a slug
//  check if painting exists
//  update or save new painting
//  add errors or success info
// send errors
// send successful upload info

exports.addPaintingsFromCSV = async (req, res) => {
  const files = await parseFiles(req)
  const paintings = await convertCSVtoJSON(files.csv.path)
  const series = {}
  const paintingsUpdated = []
  const paintingsAdded = []
  const errors = []
  // fetch ObjectIds of series
  for (const painting of paintings) {
    if (!series[painting.series]) series[painting.series] = await Series.findOne({ name: painting.series })
    else continue
  }
  // assign slug and series id to paintings
  paintings.forEach(painting => {
    painting.slug = slugify(painting.title)
    if (series[painting.series]) painting.series = series[painting.series]._id
    painting.sold.toLowerCase() === "true" ? painting.sold = true : painting.sold = false
  })
  for (const painting of paintings) {
    try {
      paintingAlreadyInDatabase = await Painting.findOne({ title: painting.title })
      if (paintingAlreadyInDatabase) {
        Object.keys(painting).forEach(key => {
          paintingAlreadyInDatabase[key] = painting[key]
        })
        const updatedPainting = await paintingAlreadyInDatabase.save()
        paintingsUpdated.push(updatedPainting)
      } else {
        const addedPainting = await new Painting(painting).save()
        paintingsAdded.push(addedPainting)
      }
    } catch (err) {
      errors.push(err)
    }
  }
  console.log("updated: ", paintingsUpdated)
  console.log("added: ", paintingsAdded)
  console.log("errors: ", errors)
  res.json({ paintingsUpdated, paintingsAdded, errors })
}