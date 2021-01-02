const express = require("express");
const paintingsMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { get } = require("./getPainting");
const { getThumbnail } = require("./getThumbnail");
const { getFull } = require("./getPaintingWithFullImage");
const { create } = require("./addPainting");
const { edit } = require("./editPainting");
const { remove } = require("./removePainting");
const { addPaintingsFromCSV } = require("./addPaintingsFromCSV");
const { addMultiplePaintingImages } = require("./addMultiplePaintingImages");

paintingsMainRouter.get("/:slug", get);
paintingsMainRouter.get("/thumbnail/:id", getThumbnail);
paintingsMainRouter.get("/with-full-image/:slug", getFull);
paintingsMainRouter.post("/", authCheck, adminCheck, create);
paintingsMainRouter.put("/", authCheck, adminCheck, edit);
paintingsMainRouter.delete("/", authCheck, adminCheck, remove);
paintingsMainRouter.post(
  "/upload-csv",
  authCheck,
  adminCheck,
  addPaintingsFromCSV
);
paintingsMainRouter.post(
  "/upload-multiple-painting-images",
  authCheck,
  adminCheck,
  addMultiplePaintingImages
);

module.exports = paintingsMainRouter;
