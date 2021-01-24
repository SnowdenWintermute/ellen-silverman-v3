const mongoose = require("mongoose");

const viewCounter = new mongoose.Schema(
  {
    views: Number,
    uniqueViewIps: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ViewCounter", viewCounter);