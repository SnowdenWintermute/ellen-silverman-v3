const Painting = require("../../models/painting");
const Series = require("../../models/series");

exports.getPaintingsInSeries = async (req, res) => {
  const { seriesSlug } = req.params;
  try {
    const series = await Series.findOne({ slug: seriesSlug });
    const paintingsInSeries = await Painting.find({ series: series._id })
      .select("-image")
      .populate("series");
    return res.status(200).json(paintingsInSeries);
  } catch (error) {
    console.log(error);
    return res.status(400).error("Painting search failed");
  }
};
