module.exports = function createImgSrcStringFromBinary(contentType, data) {
  return `data:${contentType};base64,${Buffer.from(data).toString('base64')}`
}