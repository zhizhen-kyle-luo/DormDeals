import React, { useState, useContext } from "react";
import { UserContext, CartContext } from "../App.jsx";
import { get, post } from "../../utilities";
import "./Cart.css";

const Cart = () => {
  const { userId } = useContext(UserContext);
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const statusOfItem = (item) => {
    const [existsItem, setExistsItem] = useState();
    const [itemSold, setItemSold] = useState();
    let status = "";
    get("/api/existsorder", { orderId: item.itemId }).then((exists) => setExistsItem(exists));

    // item.sold does not show up/is not transferred to cart; using this method for now
    if (existsItem) {
      get("/api/order", { orderId: item.itemId }).then((orderObj) => setItemSold(orderObj.sold));
    }

    if (!existsItem) {
      status = "Deleted";
    } else if (!itemSold) {
      status = "Available";
    } else {
      status = "Sold";
    }
    return <>{status}</>;
  };

  const handleCheckout = () => {};

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="Cart-container">
        <h1>Your Cart</h1>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", color: "#e07007" }}>Your Cart</h1>
      </div>
      <div className="div-main">
        <div className="Cart-container">
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.itemId} className="cart-item">
                  <img src={item.images[0]} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    {statusOfItem(item)}
                    <p className="price">${item.price}</p>
                    <p>{item.description}</p>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(item.itemId)}>
                    Remove
                  </button>
                  <button className="checkout-button" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
