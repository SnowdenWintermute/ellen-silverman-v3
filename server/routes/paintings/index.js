const express = require("express");
const paintingsMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addPainting');
const { addPaintingsFromCSV } = require("./addPaintingsFromCSV");

paintingsMainRouter.post("/", authCheck, adminCheck, create);
paintingsMainRouter.post("/upload-csv", authCheck, adminCheck, addPaintingsFromCSV);

module.exports = paintingsMainRouter