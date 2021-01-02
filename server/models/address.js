const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: "Address must have a name",
      index: true,
    },
    firstLine: {
      type: String,
      trim: true,
      required: "Please enter an address",
      index: true,
    },
    secondLineLine: {
      type: String,
      trim: true,
      index: true,
    },
    city: {
      type: String,
      trim: true,
      required: "Please enter a city",
      index: true,
    },
    state: {
      type: String,
      trim: true,
      required: "Please enter a city",
      index: true,
    },
    zip: {
      type: Number,
      trim: true,
      required: "Please enter a zip code",
      index: true,
    },
    phone: {
      type: Number,
      trim: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);