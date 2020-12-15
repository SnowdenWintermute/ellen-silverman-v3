const express = require("express");
const seriesMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addSeries')
const { remove } = require('./removeSeries')
const { list } = require('./listSeries')
const { listPaintingsInSeries } = require('./listPaintingsInSeries')

seriesMainRouter.post("/", authCheck, adminCheck, create);
seriesMainRouter.delete("/", authCheck, adminCheck, remove);
seriesMainRouter.get("/list", list);
seriesMainRouter.get("/list-paintings/:seriesId", listPaintingsInSeries);

module.exports = seriesMainRouter