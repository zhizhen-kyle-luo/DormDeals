const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: {
    name: String,
    _id: String,
  },
  description: String,
  email: String,
  picture: Object,
});

// compile model from schema
module.exports = mongoose.model("user-profile", UserProfileSchema);
