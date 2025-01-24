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
        } else {
          userProfile = new UserProfile({
            user: user,
            description: "Blank",
            email: "Blank",
            picture: req.query.picture,
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
  Item.find({}).then((items) => {
    res.send(items);
  });
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

// Cart endpoints
router.get("/cart", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id)
    .populate("cart")
    .then((user) => {
      res.send(user.cart || []);
    })
    .catch((err) => {
      console.log("Failed to fetch cart:", err);
      // res.status(500).send({ error: "Failed to fetch cart" });
    });
});

router.post("/cart/:itemId", auth.ensureLoggedIn, (req, res) => {
  const itemId = req.params.itemId;
  User.findByIdAndUpdate(req.user._id, { $addToSet: { cart: itemId } }, { new: true })
    .populate("cart")
    .then((user) => {
      res.send(user.cart);
    })
    .catch((err) => {
      console.log("Failed to add item to cart:", err);
      res.status(500).send({ error: "Failed to add item to cart" });
    });
});

router.delete("/cart/:itemId", auth.ensureLoggedIn, (req, res) => {
  const itemId = req.params.itemId;
  User.findByIdAndUpdate(req.user._id, { $pull: { cart: itemId } }, { new: true })
    .populate("cart")
    .then((user) => {
      res.send(user.cart);
    })
    .catch((err) => {
      console.log("Failed to remove item from cart:", err);
      res.status(500).send({ error: "Failed to remove item from cart" });
    });
});

// anything else falls to this "not found" case

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
