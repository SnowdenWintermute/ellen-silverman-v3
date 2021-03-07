const formidable = require('formidable');
const _ = require('lodash');
const Painting = require('../../models/painting');
const slugify = require("slugify");
const parseFormFieldsAndFiles = require('../utils/parseFormFieldsAndFiles');
const createAndAssignThumbnailToPainting = require('../utils/paintings/createAndAssignThumbnailToPainting')
const assignPaintingImageFromFile = require('../utils/paintings/assignPaintingImageFromFile')
const updateSeriesMetadata = require('../utils/series/updateSeriesMetadata');
const Series = require('../../models/series');

exports.create = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    const parsedForm = await parseFormFieldsAndFiles(req)
    let painting = new Painting(parsedForm.fields);
    painting.seriesList = parsedForm.fields.seriesList.split(",")
    if (parsedForm.files.image) {
      await assignPaintingImageFromFile(painting, parsedForm.files.image)
      await createAndAssignThumbnailToPainting(painting)
    }
    if (painting.title) {
      painting.slug = slugify(painting.title)
      painting.title_lower = painting.title.toLowerCase()
    }
    const newPainting = await painting.save()
    updateSeriesMetadata(newPainting.seriesList)
    res.json(newPainting);

  } catch (error) {
    console.log(error)
    if (error.code === 11000) return res.status(400).json({ message: "Duplicate named entry found in database." })
    return res.status(400).json(error)
  }
};