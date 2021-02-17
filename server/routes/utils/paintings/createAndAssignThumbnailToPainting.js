const sharp = require('sharp')

module.exports = createAndAssignThumbnailToPainting = async (painting) => {
  const thumbnail = await sharp(painting.image.data)
    .resize({ width: 500 })
    .toBuffer()
  painting.thumbnail.data = thumbnail
  painting.thumbnail.contentType = painting.image.contentType
}