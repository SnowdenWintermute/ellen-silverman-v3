const parseFormFieldsAndFiles = require('../utils/parseFormFieldsAndFiles')
const formidable = require('formidable')

exports.edit = async (req, res) => {
  const parsedForm = await parseFormFieldsAndFiles(req)
  console.log("parsed form: ", parsedForm)
  res.json("ey")
}