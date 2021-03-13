parseFiles = require("../utils/parseFiles");
convertCSVtoJSON = require("../utils/convertCSVtoJSON");
const Painting = require("../../models/painting");
const Series = require("../../models/series");
const slugify = require("slugify");
const updateSeriesMetadata = require("../utils/series/updateSeriesMetadata");
// const addSeriesFromCSV = require('./addSeriesFromCSV')

exports.addPaintingsFromCSV = async (req, res) => {
  const files = await parseFiles(req);
  let paintings;
  try {
    paintings = await convertCSVtoJSON(files.csv.path);
  } catch (err) {
    return res
      .status(400)
      .json({ error: { message: "Please choose a .csv file to upload" } });
  }
  const seriesList = {};
  const paintingsUpdated = [];
  const paintingsAdded = [];
  const errors = [];
  // fetch ObjectIds of series
  for (const painting of paintings) {
    if (!seriesList[painting.series])
      seriesList[painting.series] = await Series.findOne({
        name: painting.series,
      });
    else continue;
  }

  // addSeriesFromCSV(paintings, seriesList) // use with caution, if any series is misspelled it will create a "duplicate" of that series

  // assign slug and series ids to paintings
  paintings.forEach((painting) => {
    if (!painting.title) return;
    painting.slug = slugify(painting.title);
    painting.title_lower = painting.title.toLowerCase();
    if (seriesList[painting.series])
      painting.seriesList = [seriesList[painting.series]._id];

    if (painting.sold.toLowerCase() === "true") {
      painting.sold = true;
      painting.stock = 0;
    } else {
      painting.sold = false;
    }
  });

  console.log("paintings: ", paintings);

  for (const painting of paintings) {
    try {
      paintingAlreadyInDatabase = await Painting.findOne({
        title: painting.title,
      });
      if (paintingAlreadyInDatabase) {
        Object.keys(painting).forEach((key) => {
          if (key === "seriesList") {
            const newSeriesList = [...paintingAlreadyInDatabase.seriesList];
            painting.seriesList.forEach((seriesId) => {
              if (paintingAlreadyInDatabase.seriesList.indexOf(seriesId) === -1)
                newSeriesList.push(seriesId);
            });
            paintingAlreadyInDatabase.seriesList = newSeriesList;
          } else if (key !== "sold")
            paintingAlreadyInDatabase[key] = painting[key].trim();
        });
        const updatedPainting = await paintingAlreadyInDatabase.save();
        paintingsUpdated.push(updatedPainting);
      } else {
        const addedPainting = await new Painting(painting).save();
        paintingsAdded.push(addedPainting);
      }
    } catch (error) {
      // console.log(error);
      errors.push({ error: error, paintingTitle: painting.title });
    }
  }
  const seriesListToUpdateMetadata = [];
  Object.keys(seriesList).forEach((seriesName) => {
    if (seriesList[seriesName])
      seriesListToUpdateMetadata.push(seriesList[seriesName]._id);
  });
  updateSeriesMetadata(seriesListToUpdateMetadata);
  res.json({ paintingsUpdated, paintingsAdded, errors });
};
