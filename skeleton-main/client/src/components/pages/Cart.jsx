import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../App.jsx";
import { get } from "../../utilities";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems = [], removeFromCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [savedForLater, setSavedForLater] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [itemStatuses, setItemStatuses] = useState({});

  useEffect(() => {
    setIsLoading(true);
    // Check status of all cart items
    const checkItemStatuses = async () => {
      const statuses = {};
      for (const item of cartItems) {
        try {
          const orderDetails = await get("/api/order", { orderId: item.itemId });
          statuses[item.itemId] = orderDetails.status;
        } catch (error) {
          console.error("Error fetching item status:", error);
          statuses[item.itemId] = "error";
        }
      }
      setItemStatuses(statuses);
      setIsLoading(false);
    };

    checkItemStatuses();
  }, [cartItems]);

  const toggleItemSelection = (itemId) => {
    if (itemStatuses[itemId] === "Active") {
      const newSelected = new Set(selectedItems);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
      } else {
        newSelected.add(itemId);
      }
      setSelectedItems(newSelected);
    }
  };

  const toggleSaveForLater = (itemId) => {
    if (itemStatuses[itemId] === "Active") {
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
    }
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter(
      (item) => selectedItems.has(item.itemId) && itemStatuses[item.itemId] === "Active"
    );
    if (itemsToCheckout.length === 0) {
      alert("Please select active items to purchase");
      return;
    }
    navigate("/purchase", { state: { items: itemsToCheckout } });
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter((item) => selectedItems.has(item.itemId) && itemStatuses[item.itemId] === "Active")
      .reduce((sum, item) => sum + item.price, 0);
  };

  const handleItemClick = (itemId) => {
    navigate(`/OrderDetails/${itemId}`);
  };

  // Filter items based on their status
  const activeItems = cartItems.filter(
    (item) => !savedForLater.has(item.itemId) && itemStatuses[item.itemId] === "Active"
  );

  const savedItems = cartItems.filter(
    (item) => savedForLater.has(item.itemId) && itemStatuses[item.itemId] === "Active"
  );

  const expiredItems = cartItems.filter(
    (item) => itemStatuses[item.itemId] && itemStatuses[item.itemId] !== "Active"
  );

  if (isLoading) {
    return (
      <div className="cart-container">
        <div className="Loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-top-section">
          <div className="cart-main">
            <div className="cart-header">
              <h1>Shopping Cart</h1>
              <span>{activeItems.length} items</span>
            </div>

            {activeItems.length === 0 ? (
              <div className="No-items">No items in your cart</div>
            ) : (
              <div className="cart-items">
                {activeItems.map((item) => (
                  <div key={item.itemId} className="cart-item">
                    <div className="cart-item-select">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.itemId)}
                        onChange={() => toggleItemSelection(item.itemId)}
                      />
                    </div>
                    <div className="cart-item-image" onClick={() => handleItemClick(item.itemId)}>
                      <img src={item.images[0]} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3 onClick={() => handleItemClick(item.itemId)}>{item.name}</h3>
                      <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                      <div className="cart-item-actions">
                        <button onClick={() => removeFromCart(item.itemId)}>Remove</button>
                        <button onClick={() => toggleSaveForLater(item.itemId)}>
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-details">
              <div className="cart-summary-row">
                <span>Subtotal ({selectedItems.size} items)</span>
                <span>${Number(calculateSubtotal()).toFixed(2)}</span>
              </div>
            </div>
            <button
              className="cart-checkout-button"
              onClick={handleCheckout}
              disabled={selectedItems.size === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        <div className="saved-items-section">
          <div className="section-header">
            <h2>Saved for Later</h2>
            <span>{savedItems.length} items</span>
          </div>
          {savedItems.length === 0 ? (
            <div className="No-items">No items saved for later</div>
          ) : (
            <div className="cart-items">
              {savedItems.map((item) => (
                <div key={item.itemId} className="cart-item">
                  <div className="cart-item-image" onClick={() => handleItemClick(item.itemId)}>
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3 onClick={() => handleItemClick(item.itemId)}>{item.name}</h3>
                    <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                    <div className="cart-item-actions">
                      <button onClick={() => removeFromCart(item.itemId)}>Remove</button>
                      <button onClick={() => toggleSaveForLater(item.itemId)}>Move to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="expired-items-section">
          <div className="section-header">
            <h2>Expired Items</h2>
            <span>{expiredItems.length} items</span>
          </div>
          {expiredItems.length === 0 ? (
            <div className="No-items">No expired items</div>
          ) : (
            <div className="cart-items">
              {expiredItems.map((item) => (
                <div key={item.itemId} className="cart-item expired">
                  <div className="cart-item-image" onClick={() => handleItemClick(item.itemId)}>
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3 onClick={() => handleItemClick(item.itemId)}>{item.name}</h3>
                    <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                    <div className="cart-item-actions">
                      <button onClick={() => removeFromCart(item.itemId)}>Remove from cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
