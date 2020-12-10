const express = require("express");
const paintingsMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addPainting');
const { addPaintingsFromCSV } = require("./addPaintingsFromCSV");
const { addMultiplePaintingImages } = require("./addMultiplePaintingImages");

paintingsMainRouter.post("/", authCheck, adminCheck, create);
paintingsMainRouter.post("/upload-csv", authCheck, adminCheck, addPaintingsFromCSV);
paintingsMainRouter.post("/upload-multiple-painting-images", authCheck, adminCheck, addMultiplePaintingImages);

module.exports = paintingsMainRouter