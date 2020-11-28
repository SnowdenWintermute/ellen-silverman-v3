const Series = require('../../models/series')

exports.list = async (req, res) =>
  res.json(await Series.find({}).sort({ createdAt: -1 }).exec());
