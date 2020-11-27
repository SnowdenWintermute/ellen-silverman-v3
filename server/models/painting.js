const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const paintingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Painting must have a title",
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    size: {
      type: String,
      enum: ['11" x 14"']
    },
    materials: {
      type: String,
      enum: ['Oil on canvas',]
    },
    datePainted: {
      type: Date,
    },
    picture: { type: String },
    price: {
      type: Number,
      required: "Please enter the price"
    },
    series: {
      type: String,
      required: "Please specify which series the painting is from"
    },
    description: {
      type: String,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", paintingSchema);