
const fs = require('fs');
const parseFiles = require("../utils/parseFiles")
const Painting = require('../../models/painting');
const createIterableObject = require('../utils/createIterableObject')
const sharp = require('sharp')

exports.addMultiplePaintingImages = async (req, res) => {
  const files = await parseFiles(req)
  const errors = []
  const paintingImagesSaved = []
  const paintingImagesUpdated = []
  const iterableFilesObject = createIterableObject(files)
  try {
    for (const image of iterableFilesObject) {
      try {
        const imageName = (image.name).split(".")[0]
        const painting = await Painting.findOne({ title_lower: imageName.toLowerCase() })
        if (painting) {
          let paintingAlreadyHadImage = false
          if (painting.image.data) paintingAlreadyHadImage = true
          painting.image.data = fs.readFileSync(image.path);
          painting.image.contentType = image.type;
          try {
            const thumbnail = await sharp(painting.image.data)
              .resize({ width: 500 })
              .toBuffer()
            painting.thumbnail.data = thumbnail
            painting.thumbnail.contentType = image.type
          } catch (error) {
            console.log(error)
            errors.push(error)
          }
          const savedPainting = await painting.save()
          const paintingToSendBack = { title: savedPainting.title, thumbnail: savedPainting.thumbnail }
          if (paintingAlreadyHadImage) paintingImagesUpdated.push(paintingToSendBack)
          else paintingImagesSaved.push(paintingToSendBack)
        }
        else errors.push({ paintingTitle: imageName, message: `No painting found with the title ${imageName}` })
      } catch (err) {
        errors.push({ message: err.message })
      }
    }
  } catch (err) {
    console.log(err)
    errors.push({ message: err.message })
  }
  return res.status(200).json(
    { errors, paintingImagesSaved, paintingImagesUpdated }
  )
};