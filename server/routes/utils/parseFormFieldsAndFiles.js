const formidable = require('formidable');

module.exports = async (req) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  const parsed = await new Promise(function (resolve, reject) {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
  return parsed
}