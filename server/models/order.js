const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
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
    orderTotal: Number,
    totalAfterDiscount: Number,
    shippingAddress: { type: ObjectId, ref: "Address" },
    tracking: {},
    orderedBy: { type: ObjectId, ref: "User" },
    paymentIntent: {
      type: Object
    },
    status: {
      type: String,
      default: "processing",
      enum: ["processing", "shipped", "cancelled", "completed"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);