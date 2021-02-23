const Painting = require('../../../models/painting');
const assignPaintingImageFromFile = require('./assignPaintingImageFromFile')
const createAndAssignThumbnailToPainting = require('./createAndAssignThumbnailToPainting')

exports.findMatchingPaintingByImageNameAndAddImage = async (image, results) => {
  try {
    const { errors, paintingImagesSaved, paintingImagesUpdated, seriesToBeUpdated } = results
    const imageName = (image.name).split(".")[0]
    const painting = await Painting.findOne({ title_lower: imageName.toLowerCase() })
    if (painting) {
      let paintingAlreadyHadImage = painting.image.data ? true : false
      await assignPaintingImageFromFile(painting, image)
      await createAndAssignThumbnailToPainting(painting)
      const savedPainting = await painting.save()
      if (!seriesToBeUpdated.includes(painting.series.toString())) seriesToBeUpdated.push(painting.series.toString())
      const paintingToSendBack = { title: savedPainting.title, thumbnail: savedPainting.thumbnail }
      if (paintingAlreadyHadImage) paintingImagesUpdated.push(paintingToSendBack)
      else paintingImagesSaved.push(paintingToSendBack)
    }
    else errors.push({ paintingTitle: imageName, message: `No painting found with the title ${imageName}` })
  } catch (err) {
    errors.push({ message: err.message })
  }
}