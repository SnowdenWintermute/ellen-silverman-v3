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
    numberOfPaintings: {
      type: Number,
      default: 0
    },
    numberSold: {
      type: Number,
      default: 0
    },
    veiws: {
      unique: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      },
      uniqueIps: {
        type: ObjectId,
        ref: "seriesUniqueViewIpList",
      },
    },
    yearRange: {
      earliest: Number,
      latest: Number
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", seriesSchema);