const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  seller: String,
  seller_id: String,
  description: String,
  image: String,
  price: Number,
  tags: Array,
});

// compile model from schema
module.exports = mongoose.model("item", ItemSchema);
