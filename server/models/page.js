const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Page must have a title",
      index: true,
      unique: true,
    },
    slug: {
      type: String,
      trim: true,
      required: "Page must have a slug",
      index: true,
      unique: true,
    },
    viewCounter: { type: ObjectId, ref: "ViewCounter" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
