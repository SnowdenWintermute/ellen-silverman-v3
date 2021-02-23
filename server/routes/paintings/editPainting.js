const parseFormFieldsAndFiles = require('../utils/parseFormFieldsAndFiles')
const Painting = require('../../models/painting')
const assignPaintingImageFromFile = require('../utils/paintings/assignPaintingImageFromFile')
const updateSeriesMetadata = require('../utils/series/updateSeriesMetadata')

exports.edit = async (req, res) => {
  const parsedForm = await parseFormFieldsAndFiles(req)
  try {
    const paintingToBeEdited = await Painting.findOne({ title: parsedForm.fields.title })
    if (!paintingToBeEdited) return res.status(400).json({ error: { message: "No painting found by that name" } })
    Object.keys(parsedForm.fields).forEach(key => {
      if (key !== "thumbnail" && key !== "image") paintingToBeEdited[key] = parsedForm.fields[key]
    })
    const image = parsedForm.files.image
    if (image) {
      await assignPaintingImageFromFile(paintingToBeEdited, parsedForm.files.image)
      await createAndAssignThumbnailToPainting(paintingToBeEdited)
    }
    await paintingToBeEdited.save()
    updateSeriesMetadata(paintingToBeEdited.series)
    return res.status(200).json(paintingToBeEdited)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}