const formidable = require('formidable');

const parseFiles = async (formData) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  const parsed = await new Promise(function (resolve, reject) {
    form.parse(formData, async function (err, fields, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve(files)
    });
  });
  return parsed
}

module.exports = parseFiles