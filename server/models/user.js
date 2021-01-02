const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
    },
    picture: { type: String },
    addresses: [{ type: ObjectId, ref: "Address" }],
    wishlist: [{ type: ObjectId, ref: "Painting" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);