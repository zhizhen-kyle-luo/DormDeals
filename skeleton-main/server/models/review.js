const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewer: {
    name: String,
    _id: String,
  },
  seller: {
    name: String,
    _id: String,
  },
  itemId: String,
  rating: Number,
  review: String,
  date: { type: Date, default: Date.now }
});

// compile model from schema
module.exports = mongoose.model("review", ReviewSchema);
