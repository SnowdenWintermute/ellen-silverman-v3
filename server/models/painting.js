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
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    drawingMaterial: {
      type: String,
      lowercase: true,
      enum: ['oil', 'pastel', 'watercolor', 'acrylic', 'graphite', 'charcoal', 'ink', 'crayon']
    },
    support: {
      type: String,
      lowercase: true,
      enum: ['canvas', 'paper', 'card stock', 'vellum', 'fabric', 'stone', 'wood', 'metal',]
    },
    year: {
      type: Number,
    },
    image: { data: Buffer, contentType: String },
    thumbnail: { data: Buffer, contentType: String },
    price: {
      type: Number,
      required: "Please enter the price"
    },
    series: {
      type: ObjectId,
      ref: "series",
      required: "Please specify which series the painting is from"
    },
    description: {
      type: String,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);