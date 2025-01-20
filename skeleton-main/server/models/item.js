const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  seller: String,
  seller_id: String,
  name: String,
  price: Number,
  category: String,
  condition: String,
  description: String,
  image: Array,
});

// compile model from schema
module.exports = mongoose.model("item", ItemSchema);
