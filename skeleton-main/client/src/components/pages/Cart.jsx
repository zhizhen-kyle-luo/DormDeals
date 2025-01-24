import React, { useState, useEffect } from "react";
import ItemCart from "./ItemCart";
import "./Cart.css";

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartItems = () => {
    if (user?._id) {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((items) => {
          console.log("Cart items:", items);
          setCartItems(items);
          // Calculate total price
          const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
          setTotalPrice(total);
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
        });
    }
  };

  useEffect(() => {
    fetchCartItems();
    // Set up an interval to refresh cart items every 30 seconds
    const intervalId = setInterval(fetchCartItems, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  const handleRemoveFromCart = (itemId) => {
    fetch(`/api/cart/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((updatedCart) => {
        setCartItems(updatedCart);
      })
      .catch((err) => {
        console.error("Error removing item from cart:", err);
      });
  };

  const handleCheckout = () => {
    // Create email content
    const itemsList = cartItems.map((item) => `- ${item.name}: $${item.price}`).join("\n");

    const emailBody = `Hello,

I'm interested in purchasing the following items from your marketplace:

${itemsList}

Total: $${totalPrice.toFixed(2)}

My contact information:
Name: ${user.name}
Email: ${user.email}

Please let me know how to proceed with the purchase.

Thank you!`;

    // Create mailto URL
    const mailtoUrl = `mailto:?subject=Purchase Request - Marketplace Items&body=${encodeURIComponent(
      emailBody
    )}`;

    // Open default email client
    window.location.href = mailtoUrl;
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {!user ? (
        <div>Please log in to view your cart</div>
      ) : cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((cartItem) => (
              <ItemCart
                key={cartItem._id}
                cartItem={cartItem}
                user={user}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
