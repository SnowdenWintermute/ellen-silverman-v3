const Painting = require("../../models/painting");
const Series = require("../../models/series");
const incrementVeiwableObjectViewCounter = require("../utils/incrementVeiwableObjectViewCounter");

exports.getPaintingsInSeries = async (req, res) => {
  const { seriesSlug, withThumbnails } = req.params;

  try {
    const series = await Series.findOne({ slug: seriesSlug }).populate(
      "viewCounter"
    );
    const propertiesToNotFetch = `-image${
      withThumbnails === "with-thumbnails" ? "" : " -thumbnail"
    }`;
    const paintingsInSeries = await Painting.find({ seriesList: series._id })
      .select(propertiesToNotFetch)
      .populate("seriesList");

    incrementVeiwableObjectViewCounter(series, req.ip);
    return res.status(200).json(paintingsInSeries);
  } catch (error) {
    console.log(error);
    return res.status(400).error("Painting search failed");
  }
};
