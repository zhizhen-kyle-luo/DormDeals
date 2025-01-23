import React, { useState, useEffect } from "react";
import ItemCart from "./ItemCart";
import "./itemCart.css";

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((items) => {
          console.log("Cart items:", items);
          setCartItems(items);
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
        });
    }
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

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {!user ? (
        <div>Please log in to view your cart</div>
      ) : cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
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
      )}
    </div>
  );
};

export default Cart;
