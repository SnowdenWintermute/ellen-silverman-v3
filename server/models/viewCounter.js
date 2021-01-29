const mongoose = require("mongoose");

const viewCounter = new mongoose.Schema(
  {
    views: { type: Number, default: 0 },
    uniqueIps: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ViewCounter", viewCounter);
