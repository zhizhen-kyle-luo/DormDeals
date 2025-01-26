const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,

  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      images: [
        {
          type: String,
        },
      ],
      sold: {
        type: Boolean,
        required: true,
      },
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
