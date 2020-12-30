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
  let paintings
  try {
    paintings = await convertCSVtoJSON(files.csv.path)
  } catch (err) {
    return res.status(400).json({ error: { message: "Please choose a .csv file to upload" } })
  }
  const seriesList = {}
  const paintingsUpdated = []
  const paintingsAdded = []
  const errors = []
  // fetch ObjectIds of series
  for (const painting of paintings) {
    if (!seriesList[painting.series]) seriesList[painting.series] = await Series.findOne({ name: painting.series })
    else continue
  }

  //if want add series from csv too
  // for (const painting of paintings) {
  //   if (!painting.series) continue
  //   if (!seriesList[painting.series]) {
  //     const seriesToAddToList = await Series.findOne({ name: painting.series })
  //     if (!seriesToAddToList) seriesList[painting.series] = await new Series({ name: painting.series, slug: slugify(painting.series) }).save()
  //     else seriesList[painting.series] = seriesToAddToList
  //   }
  //   else continue
  // }

  // assign slug and series id to paintings
  paintings.forEach(painting => {
    if (!painting.title) return
    painting.slug = slugify(painting.title)
    painting.title_lower = painting.title.toLowerCase()
    if (seriesList[painting.series]) painting.series = seriesList[painting.series]._id
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
      errors.push({ error: err, paintingTitle: painting.title })
    }
  }
  res.json({ paintingsUpdated, paintingsAdded, errors })
}