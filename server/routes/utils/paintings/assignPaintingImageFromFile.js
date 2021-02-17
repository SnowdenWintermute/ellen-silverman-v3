const fs = require('fs');

module.exports = assignPaintingImageFromFile = async (painting, imageFile) => {
  painting.image.data = fs.readFileSync(imageFile.path);
  painting.image.contentType = imageFile.type;
}