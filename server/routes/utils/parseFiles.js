const formidable = require('formidable');

const parseFiles = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  const parsed = await new Promise(function (resolve, reject) {
    form.parse(req, async function (err, fields, files) {
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