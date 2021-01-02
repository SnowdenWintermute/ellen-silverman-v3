const parseFormFieldsAndFiles = require('../utils/parseFormFieldsAndFiles')
const Painting = require('../../models/painting')
const sharp = require('sharp')
const fs = require('fs')

exports.edit = async (req, res) => {
  const parsedForm = await parseFormFieldsAndFiles(req)
  console.log("parsed form: ", parsedForm)
  try {
    const paintingToBeEdited = await Painting.findOne({ title: parsedForm.fields.title })
    if (!paintingToBeEdited) return res.status(400).json({ error: { message: "No painting found by that name" } })
    Object.keys(paintingToBeEdited).forEach(key => {
      if (parsedForm.fields[key]) paintingToBeEdited[key] = parsedForm.fields[key]
    })
    const { image } = parsedForm.files
    if (image) {
      paintingToBeEdited.image.data = fs.readFileSync(image.path);
      paintingToBeEdited.image.contentType = image.type;
      const thumbnail = await sharp(paintingToBeEdited.image.data)
        .resize({ width: 500 })
        .toBuffer()
      paintingToBeEdited.thumbnail.data = thumbnail
      paintingToBeEdited.thumbnail.contentType = image.type
    }
    await paintingToBeEdited.save()
    return res.status(200).json(paintingToBeEdited)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}