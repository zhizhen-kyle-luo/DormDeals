import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../App.jsx";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);
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
    const itemsToCheckout = cartItems.filter(item => selectedItems.has(item._id));
    if (itemsToCheckout.length === 0) {
      alert("Please select items to purchase");
      return;
    }
    navigate("/purchase", { state: { items: itemsToCheckout } });
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item._id))
      .reduce((sum, item) => sum + item.price, 0);
  };

  const activeItems = cartItems.filter(item => !savedForLater.has(item._id));
  const savedItems = cartItems.filter(item => savedForLater.has(item._id));

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
              <div key={item._id} className="cart-item">
                <div className="item-select">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item._id)}
                    onChange={() => toggleItemSelection(item._id)}
                  />
                </div>
                <div className="item-image">
                  <img src={item.image} alt={item.itemName} />
                </div>
                <div className="item-details">
                  <h3>{item.itemName}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-condition">Condition: {item.condition}</p>
                  <div className="item-actions">
                    <button onClick={() => toggleSaveForLater(item._id)}>
                      Save for later
                    </button>
                    <button onClick={() => removeFromCart(item._id)}>
                      Remove
                    </button>
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
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.itemName} />
                  </div>
                  <div className="item-details">
                    <h3>{item.itemName}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-condition">Condition: {item.condition}</p>
                    <div className="item-actions">
                      <button onClick={() => toggleSaveForLater(item._id)}>
                        Move to Cart
                      </button>
                      <button onClick={() => removeFromCart(item._id)}>
                        Remove
                      </button>
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
