const express = require("express");
const seriesMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addSeries')
const { editSeriesName } = require('./editSeriesName')
const { remove } = require('./removeSeries')
const { list } = require('./listSeries')
const { listPaintingsInSeries } = require('./listPaintingsInSeries');
const { getSeriesWithThumbnails } = require("./getAllSeriesCoverImages");
const { getPaintingsInSeries } = require("./getPaintingsInSeries");
const { getSeries } = require("./getSeries");
const { getSeriesById } = require("./getSeriesById");

seriesMainRouter.post("/", authCheck, adminCheck, create);
seriesMainRouter.put("/", authCheck, adminCheck, editSeriesName);
seriesMainRouter.delete("/", authCheck, adminCheck, remove);
seriesMainRouter.get("/list", list);
seriesMainRouter.get("/list-paintings/:seriesId", listPaintingsInSeries);
seriesMainRouter.get("/list-with-thumbnails", getSeriesWithThumbnails);
seriesMainRouter.get("/:seriesSlug", getSeries);
seriesMainRouter.get("/id/:seriesId", getSeriesById);
seriesMainRouter.get("/paintings/:seriesSlug", getPaintingsInSeries);

module.exports = seriesMainRouter