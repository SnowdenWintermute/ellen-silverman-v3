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
        subtotal: Number,
        returnRequested: {
          type: Boolean,
          default: false
        },
        returned: {
          type: Boolean,
          default: false
        },
        reasonForReturnRequest: {
          type: String,
          default: ""
        }
      },
    ],
    orderTotal: Number,
    totalAfterDiscount: Number,
    shippingAddress: { type: ObjectId, ref: "Address" },
    tracking: String,
    orderedBy: { type: ObjectId, ref: "User" },
    paymentIntent: {
      type: Object
    },
    status: {
      type: String,
      default: "processing",
      enum: ["processing", "shipped", "return requested", "returned", "cancelled", "completed"]
    },
    history: [{ message: String, timestamp: Date }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);