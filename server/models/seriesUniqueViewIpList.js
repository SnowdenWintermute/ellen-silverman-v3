const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const seriesSchema = new mongoose.Schema(
  {
    series: {
      type: ObjectId,
      ref: "series",
    },
    uniqueViewIps: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("seriesUniqueViewIpList", seriesSchema);