const Painting = require("../../models/painting");
const Series = require("../../models/series");

exports.getPaintingsInSeries = async (req, res) => {
  const { seriesSlug } = req.params;
  console.log(seriesSlug);
  try {
    const series = await Series.findOne({ slug: seriesSlug });
    console.log(series)
    const paintingsInSeries = await Painting.find({ series: series._id })
      .select("-image")
      .populate("series");
    console.log(paintingsInSeries)
    return res.status(200).json(paintingsInSeries);
  } catch (error) {
    console.log(error);
    return res.status(400).error("Painting search failed");
  }
};
