const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,

  items: [
    {
      itemId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      images: Array,
      quantity: Number,
      status: {
        type: String,
        enum: ['Active', 'Under Transaction', 'Sold'],
        default: 'Active'
      }
    },
  ],
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// Update the updatedAt timestamp before saving
// CartSchema.pre("save", function(next) {
//   this.updatedAt = new Date();
//   next();
// });

module.exports = mongoose.model("cart", CartSchema);
