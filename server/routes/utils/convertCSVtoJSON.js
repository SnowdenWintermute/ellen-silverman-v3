const csvtojson = require("csvtojson/v2");

const convertCSVtoJSON = async (path) => {
  const converter = csvtojson({ trim: true, noheader: false, })
  return await new Promise((resolve, reject) => converter.fromFile(path).then((converted) => resolve(converted)).catch(err => reject(err)))
}

module.exports = convertCSVtoJSON