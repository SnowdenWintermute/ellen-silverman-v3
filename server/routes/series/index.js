const express = require("express");
const seriesMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addSeries')
const { remove } = require('./removeSeries')
const { list } = require('./listSeries')

seriesMainRouter.post("/", authCheck, adminCheck, create);
seriesMainRouter.delete("/", authCheck, adminCheck, remove);
seriesMainRouter.get("/list", list);

module.exports = seriesMainRouter