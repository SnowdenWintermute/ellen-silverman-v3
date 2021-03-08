const mongoose = require("mongoose");
const ViewCounter = require("./viewCounter");
const { ObjectId } = mongoose.Schema;

const imageValidatior = [
  (v) => v.byteLength < 5000000,
  (props) =>
    `Image must be less than 5mb (got ${props.value.byteLength / 1000000}mb)`,
];

const arrayMinLength = (val) => val.length > 0

const paintingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Painting must have a title",
      index: true,
      unique: true,
    },
    title_lower: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    drawingMaterial: {
      type: String,
      lowercase: true,
      enum: [
        "oil",
        "pastel",
        "oil pastel",
        "watercolor",
        "acrylic",
        "pencil",
        "graphite",
        "colored pencil",
        "charcoal",
        "pencil and chalk",
        "mono print",
        "ink",
        "pen and ink",
        "reed and ink",
        "crayon",
        "mix media",
        "clay",
        "clay and wool",
        "clear tape sculpture"
      ],
    },
    support: {
      type: String,
      lowercase: true,
      enum: [
        "canvas",
        "paper",
        "card stock",
        "vellum",
        "fabric",
        "stone",
        "wood",
        "metal",
        "fiber cloth",
        "wool felt",
        "tape"
      ],
    },
    year: {
      type: Number,
    },
    image: {
      data: { type: Buffer, validate: imageValidatior },
      contentType: String,
    },
    thumbnail: { data: Buffer, contentType: String },
    price: {
      type: Number,
    },
    seriesList: {
      type: [{
        type: ObjectId,
        ref: "Series",
        required: "Please specify which series the painting is from",
      }],
      validate: [arrayMinLength, 'Painting must belong to at least one series']
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: 1
    },
    catalogueIndex: {
      type: Number
    },
    viewCounter: { type: ObjectId, ref: "ViewCounter" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);
