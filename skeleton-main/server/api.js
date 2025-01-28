/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const UserProfile = require("./models/user-profile");
const Item = require("./models/item");
const Cart = require("./models/cart");
const Review = require("./models/review");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// Profile endpoints
router.get("/useritems", (req, res) => {
  Item.find({ seller_id: req.query.userid }).then((userItemsObj) => {
    res.send(userItemsObj);
  });
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid)
    .then((user) => {
      let userProfile;
      let existsProfile;
      UserProfile.find({ user: { name: user.name, _id: req.query.userid } }).then((userObj) => {
        existsProfile = userObj.length > 0;

        /*
        First find the user by id. If the user already possesses a user profile object, display that.
        Else, create a new one for the user.
        */
        if (existsProfile === true) {
          userProfile = userObj[0];
          if (userProfile.rating.length === 0) {
            userProfile.rating = ["0.0", "0"];
          }
        } else {
          userProfile = new UserProfile({
            user: user,
            description: "Blank",
            email: "Blank",
            picture: req.query.picture,
            rating: ["0.0", "0"],
          });
        }
        userProfile.save().then(res.send([userProfile.user, userProfile]));
      });
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

router.post("/edituser", (req, res) => {
  User.findById(req.body.userid)
    .then((user) => {
      UserProfile.deleteMany({ user: { name: user.name, _id: req.body.userid } }).then();
      const editedProfile = new UserProfile({
        user: user,
        description: req.body.description,
        email: req.body.email,
        picture: req.body.picture,
        rating: req.body.rating,
      });
      editedProfile.save().then(res.send(editedProfile));
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

router.get("/userallitems", (req, res) => {
  Item.find({ seller_id: req.query.seller_id }).then((items) => {
    res.send(items);
  });
});

// Order endpoints
router.post("/orders", auth.ensureLoggedIn, (req, res) => {
  const newItem = new Item({
    seller: req.user.name,
    seller_id: req.user._id,
    name: req.body.itemName,
    price: parseFloat(req.body.price),
    category: req.body.category,
    condition: req.body.condition,
    description: req.body.description,
    images: req.body.images || [],
    status: "Active",
  });

  newItem
    .save()
    .then((savedItem) => {
      res.status(201).send(savedItem);
    })
    .catch((err) => {
      console.log("Failed to save item:", err);
      res.status(500).send({ error: "Failed to create order" });
    });
});

router.get("/orders", (req, res) => {
  Item.find({ status: "Active" }).then((items) => {
    res.send(items);
  });
});

// Get user's purchases and handle purchase updates
router
  .route("/purchases/:itemId?")
  .get(auth.ensureLoggedIn, (req, res) => {
    Item.find({
      buyer_id: req.query.userId,
      status: { $in: ["Under Transaction", "Sold"] },
    }).then((items) => {
      res.send(items);
    });
  })
  .patch(auth.ensureLoggedIn, async (req, res) => {
    try {
      const item = await Item.findById(req.params.itemId);
      if (!item) {
        return res.status(404).send({ error: "Item not found" });
      }

      item.status = req.body.status;
      item.buyer_id = req.body.buyer_id;
      item.purchaseDate = req.body.purchaseDate;

      await item.save();
      res.send(item);
    } catch (err) {
      console.log("Failed to update item:", err);
      res.status(500).send({ error: "Failed to update item" });
    }
  })
  .post(auth.ensureLoggedIn, async (req, res) => {
    try {
      const item = await Item.findById(req.params.itemId);
      if (!item) {
        return res.status(404).send({ error: "Item not found" });
      }

      item.status = req.body.status;
      item.buyer_id = req.body.buyer_id;
      item.purchaseDate = req.body.purchaseDate;

      await item.save();
      res.send(item);
    } catch (err) {
      console.log("Failed to update item:", err);
      res.status(500).send({ error: "Failed to update item" });
    }
  });

router.get("/order", (req, res) => {
  Item.findById(req.query.orderId)
    .then((order) => {
      if (!order) {
        res.status(404).send({ error: "Order not found" });
      } else {
        res.send(order);
      }
    })
    .catch((err) => {
      console.log("Failed to fetch order:", err);
      res.status(500).send({ error: "Failed to fetch order" });
    });
});

router.get("/existsorder", (req, res) => {
  Item.findById(req.query.orderId)
    .then((order) => {
      if (!order) {
        res.send(false);
      } else {
        res.send(true);
      }
    })
    .catch((err) => {
      console.log("Failed to fetch order:", err);
      res.status(500).send({ error: "Failed to fetch order" });
    });
});

router.post("/removeitem", (req, res) => {
  Item.deleteOne({ _id: req.body.orderId }).then();
  res.end();
});

router.post("/sellitem", (req, res) => {
  Item.findById(req.body.orderId)
    .then((order) => {
      order.status = order.status === "Sold" ? "Active" : "Sold";
      order.save().then(res.send(order));
    })
    .catch((err) => {
      res.status(500).send("Failed to change item status");
    });
});

// Cart endpoints
router.get("/cart", auth.ensureLoggedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.send(cart ? cart.items : []);
  } catch (err) {
    console.log("Failed to fetch cart:", err);
    res.status(500).send({ error: "Failed to fetch cart" });
  }
});

router.post("/cart/add", auth.ensureLoggedIn, async (req, res) => {
  try {
    const { item } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [],
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (i) => i.itemId.toString() === (item.itemId || item._id).toString()
    );

    if (existingItemIndex > -1) {
      // Increment quantity if item exists
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't exist
      cart.items.push({
        itemId: item.itemId || item._id,
        name: item.name,
        price: item.price,
        images: item.images,
        quantity: 1,
        status: item.status || "Active",
      });
    }

    await cart.save();
    res.send(cart.items);
  } catch (err) {
    console.log("Failed to add item to cart:", err);
    res.status(500).send({ error: "Failed to add item to cart" });
  }
});

router.delete("/cart/remove/:itemId", auth.ensureLoggedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).send({ error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.itemId.toString() !== req.params.itemId);
    await cart.save();
    res.send(cart.items);
  } catch (err) {
    console.log("Failed to remove item from cart:", err);
    res.status(500).send({ error: "Failed to remove item from cart" });
  }
});

router.post("/cart/clear", auth.ensureLoggedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.send([]);
  } catch (err) {
    console.log("Failed to clear cart:", err);
    res.status(500).send({ error: "Failed to clear cart" });
  }
});

// Update item status and buyer info
router.post("/items/update", auth.ensureLoggedIn, async (req, res) => {
  try {
    const item = await Item.findById(req.body.itemId);
    if (!item) {
      return res.status(404).send({ error: "Item not found" });
    }

    item.status = req.body.status;
    item.buyer_id = req.body.buyer_id;
    item.purchaseDate = req.body.purchaseDate;

    await item.save();
    console.log("Item updated:", item);
    res.send(item);
  } catch (err) {
    console.log("Failed to update item:", err);
    res.status(500).send({ error: "Failed to update item" });
  }
});

// Get user's purchases
router.get("/purchases", auth.ensureLoggedIn, (req, res) => {
  Item.find({
    buyer_id: req.query.userId,
    status: { $in: ["Under Transaction", "Sold"] },
  })
    .then((items) => {
      console.log("Fetched purchases for user:", req.query.userId, items);
      res.send(items);
    })
    .catch((err) => {
      console.log("Failed to fetch purchases:", err);
      res.status(500).send({ error: "Failed to fetch purchases" });
    });
});

// Review endpoints
router.post("/newreview", auth.ensureLoggedIn, (req, res) => {
  const newReview = new Review({
    reviewer: { name: req.user.name, _id: req.user._id },
    seller: req.body.seller,
    itemId: req.body.itemId,
    rating: Number(req.body.rating),
    review: req.body.review,
  });

  // First get all existing reviews for this seller
  Review.find({ seller: req.body.seller }).then((existingReviews) => {
    // Add the new review to calculate the average
    const allReviews = [...existingReviews, newReview];
    const totalRating = allReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    const averageRating = (totalRating / allReviews.length).toFixed(1);

    // Update the seller's profile with the new rating
    UserProfile.find({ user: req.body.seller }).then((seller) => {
      seller[0].rating = [averageRating, String(allReviews.length)];
      seller[0].save();
    });

    // Save the new review
    newReview
      .save()
      .then((savedReview) => {
        res.status(201).send(savedReview);
      })
      .catch((err) => {
        console.log("Failed to save review:", err);
        res.status(500).send({ error: "Failed to leave a review" });
      });
  });
});

//Checks if there already exists a review for an item
router.get("/review", (req, res) => {
  Review.find({
    reviewer: { name: req.user.name, _id: req.user._id },
    itemId: req.query.itemId,
  }).then((reviews) => {
    res.send(reviews);
  });
});

//Sends all reviews of a user
router.get("/reviews", (req, res) => {
  Review.find({ seller: { name: req.query.name, _id: req.query._id } }).then((reviews) => {
    res.send(reviews);
  });
});

// Migration endpoint to update all user profile ratings
router.post("/migrate-ratings", async (req, res) => {
  try {
    // Get all user profiles
    const userProfiles = await UserProfile.find({});
    
    // Update each profile's rating
    for (const profile of userProfiles) {
      // Get all reviews for this user
      const reviews = await Review.find({ 
        seller: { name: profile.user.name, _id: profile.user._id } 
      });
      
      if (reviews.length > 0) {
        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
        const averageRating = (totalRating / reviews.length).toFixed(1);
        
        // Update profile rating
        profile.rating = [averageRating, String(reviews.length)];
        await profile.save();
        console.log(`Updated rating for ${profile.user.name}: ${averageRating} (${reviews.length} reviews)`);
      }
    }
    
    res.send({ message: "Successfully migrated all user profile ratings" });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).send({ error: "Failed to migrate ratings" });
  }
});

// anything else falls to this "not found" case

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
