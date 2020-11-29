const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Series must have a title",
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", seriesSchema);