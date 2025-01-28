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
  status: {
    type: String,
    enum: ['Active', 'Under Transaction', 'Sold'],
    default: 'Active'
  },
  buyer_id: String,
  purchaseDate: Date,
  reviewed: {
    type: Boolean,
    default: false
  },
  review: {
    rating: Number,
    text: String
  }
});

// compile model from schema
module.exports = mongoose.model("item", ItemSchema);
