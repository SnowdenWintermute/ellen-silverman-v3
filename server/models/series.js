const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const seriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: "Series must have a title",
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      required: true
    },
    viewCounter: { type: ObjectId, ref: "ViewCounter" },
    years: {
      start: Number,
      end: Number
    },
    numberOfPaintings: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", seriesSchema);