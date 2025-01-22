import React, { useState, useEffect } from "react";
import ItemCart from "./ItemCart";
import "./itemCart.css";

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((items) => setCartItems(items));
  }, []);

  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        // cartItems.map((item) => (
          <ItemCart key={item.id} item={item} user={user} onRemoveFromCart={handleRemoveFromCart} />
        // ))
      )}
    </div>
  );
};

export default Cart;
