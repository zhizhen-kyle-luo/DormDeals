const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: {
    name: String,
    _id: String,
  },
  description: String,
  email: String,
  phone: String,
  picture: Object,
  backgroundImage: Object,
  rating: Array /*[Rating, Number of Reviews]*/,
});

// compile model from schema
module.exports = mongoose.model("user-profile", UserProfileSchema);
