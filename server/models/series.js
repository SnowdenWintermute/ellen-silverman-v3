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
      maxlength: 200
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
      earliest: Number,
      latest: Number
    },
    numberOfPaintings: Number,
    numberSold: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", seriesSchema);