const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  description: String,
  category: String,
  subcategory: [String],
  specification: [String],
  imagePaths: [String], // for image file paths
  media: [String],      // includes images or .glb 3D model files
  datasheet: String
});

module.exports = mongoose.model('Product', productSchema);