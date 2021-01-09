const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: "Address must have a name",
    },
    firstLine: {
      type: String,
      trim: true,
      required: "Please enter an address",
    },
    secondLine: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: "Please enter a city",
    },
    state: {
      type: String,
      trim: true,
      required: "Please enter a state/province",
    },
    zip: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    deliveryLastLine: {
      type: String,
      trim: true,
    },
    isValidatedByUser: {
      type: Boolean,
      default: false
    },
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);