const Series = require('../../models/series')

exports.remove = (req, res) => {
  try {
    console.log(req.body)
  } catch (error) {
    console.log(error)
  }
  res.json("eyy")
};
