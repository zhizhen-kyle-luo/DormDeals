const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  seller: String,
  seller_id: String,
  name: String,
  price: Number,
  category: String,
  condition: String,
  description: String,
  images: Array,
});

// compile model from schema
module.exports = mongoose.model("item", ItemSchema);
