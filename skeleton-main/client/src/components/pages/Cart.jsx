import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../App.jsx";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems = [], removeFromCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [savedForLater, setSavedForLater] = useState(new Set());

  const toggleItemSelection = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const toggleSaveForLater = (itemId) => {
    const newSaved = new Set(savedForLater);
    if (newSaved.has(itemId)) {
      newSaved.delete(itemId);
    } else {
      newSaved.add(itemId);
      const newSelected = new Set(selectedItems);
      newSelected.delete(itemId);
      setSelectedItems(newSelected);
    }
    setSavedForLater(newSaved);
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((item) => selectedItems.has(item.itemId));
    if (itemsToCheckout.length === 0) {
      alert("Please select items to purchase");
      return;
    }
    navigate("/purchase", { state: { items: itemsToCheckout } });
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter((item) => selectedItems.has(item.itemId))
      .reduce((sum, item) => sum + item.price, 0);
  };

  const activeItems = cartItems.filter((item) => !savedForLater.has(item.itemId));
  const savedItems = cartItems.filter((item) => savedForLater.has(item.itemId));

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-main">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <span>{activeItems.length} items</span>
          </div>

          <div className="cart-items">
            {activeItems.map((item) => (
              <div key={item.itemId} className="cart-item">
                <div className="item-select">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.itemId)}
                    onChange={() => toggleItemSelection(item.itemId)}
                  />
                </div>
                <div className="item-image">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-actions">
                    <button onClick={() => toggleSaveForLater(item.itemId)}>Save for later</button>
                    <button onClick={() => removeFromCart(item.itemId)}>Remove</button>
                  </div>
                </div>
                <div className="item-price">${item.price}</div>
              </div>
            ))}
          </div>

          {savedItems.length > 0 && (
            <div className="saved-for-later">
              <h2>Saved for Later</h2>
              {savedItems.map((item) => (
                <div key={item.itemId} className="cart-item">
                  <div className="item-image">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <div className="item-actions">
                      <button onClick={() => toggleSaveForLater(item.itemId)}>Move to Cart</button>
                      <button onClick={() => removeFromCart(item.itemId)}>Remove</button>
                    </div>
                  </div>
                  <div className="item-price">${item.price}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Selected Items</span>
            <span>{selectedItems.size}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={selectedItems.size === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
