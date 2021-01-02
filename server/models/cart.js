const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    paintings: [
      {
        painting: {
          type: ObjectId,
          ref: "Painting"
        },
        count: Number,
        subtotal: Number
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);