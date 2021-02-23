
const parseFiles = require("../utils/parseFiles")
const createIterableObject = require('../utils/createIterableObject')
const { findMatchingPaintingByImageNameAndAddImage } = require("../utils/paintings/findMatchingPaintingByImageNameAndAddImage");
const updateSeriesMetadata = require("../utils/series/updateSeriesMetadata");

exports.addMultiplePaintingImages = async (req, res) => {
  const files = await parseFiles(req)
  const results = {
    errors: [],
    paintingImagesSaved: [],
    paintingImagesUpdated: [],
    seriesToBeUpdated: []
  }
  const iterableFilesObject = createIterableObject(files)
  try {
    for (const image of iterableFilesObject) await findMatchingPaintingByImageNameAndAddImage(image, results)
    results.seriesToBeUpdated.forEach(series => updateSeriesMetadata(series))
  } catch (error) {
    console.log(error)
    results.errors.push({ message: error.message })
  }
  return res.status(200).json(results)
};