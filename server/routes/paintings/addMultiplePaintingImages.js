
const fs = require('fs');
const parseFiles = require("../utils/parseFiles")
const Painting = require('../../models/painting');


exports.addMultiplePaintingImages = async (req, res) => {
  const files = await parseFiles(req)
  const errors = []
  const paintingsFound = []
  console.log({ ...files })
  // console.log(typeof files)
  try {
    for (const image in files) {
      console.log((image).split(".")[0])
      const imageName = (image).split(".")[0]
      const painting = await Painting.findOne({ title: imageName })
      console.log("line18")
      // console.log({ ...files[image] })
      if (painting) {
        paintingsFound.push(painting.title)
        console.log(fs.readFileSync(files[image].path))

        if (files[image].size > 3000000) errors.push({ message: `${painting.title}: Image too large - must be under 3000000 bytes (got ${files[image].size})` })
        else {
          painting.image.data = fs.readFileSync(files.photo.path);
          painting.image.contentType = files.photo.type;
          // add to successful response messages
        }
      }
      else errors.push({ message: `No painting found with the title ${imageName}` })
    }
  } catch (err) {
    console.log(err)
  }
  console.log(errors)
  console.log(paintingsFound)
  return res.status(200).json("placeholder")
};