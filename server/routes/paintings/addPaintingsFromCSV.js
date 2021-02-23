parseFiles = require('../utils/parseFiles')
convertCSVtoJSON = require('../utils/convertCSVtoJSON')
const Painting = require('../../models/painting');
const Series = require('../../models/series')
const slugify = require("slugify");
const updateSeriesMetadata = require('../utils/series/updateSeriesMetadata')
// const addSeriesFromCSV = require('./addSeriesFromCSV')

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

  // addSeriesFromCSV(paintings, seriesList) // use with caution, if any series is misspelled it will create a "duplicate" of that series

  // assign slug and series id to paintings
  paintings.forEach(painting => {
    if (!painting.title) return
    painting.slug = slugify(painting.title)
    painting.title_lower = painting.title.toLowerCase()
    if (seriesList[painting.series]) painting.series = seriesList[painting.series]._id
    if (painting.sold.toLowerCase() === "true") {
      painting.sold = true
      painting.stock = 0
    }
    else {
      painting.sold = false
    }
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
  Object.keys(seriesList).forEach(seriesName => { if (seriesList[seriesName]) updateSeriesMetadata(seriesList[seriesName]._id) })
  res.json({ paintingsUpdated, paintingsAdded, errors })
}