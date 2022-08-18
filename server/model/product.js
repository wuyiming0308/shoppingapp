const mongoose = require("mongoose");

var ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

//Schema Defination and model.js
var ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: String,
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  },
  { versionKey: false },
  { strict: false }
);

const ProductModel = mongoose.model("Product", ProductSchema);
const ProductCategoryModel = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

module.exports = { ProductModel, ProductCategoryModel };
