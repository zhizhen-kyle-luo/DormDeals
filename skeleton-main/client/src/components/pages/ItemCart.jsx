import React from "react";
import "./ItemCart.css";

/**
 * Component for displaying a single item in the shopping cart
 *
 * Proptypes
 * @param {Object} cartItem - The cart item object containing itemId (reference to item) and quantity
 * @param {Object} user - The current user object
 * @param {Function} onRemoveFromCart - Callback function to remove item from cart
 */
const ItemCart = ({ cartItem, user, onRemoveFromCart }) => {
  const item = cartItem.itemId; // The actual item data is in itemId due to population

  const handleRemove = () => {
    onRemoveFromCart(item._id);
  };

  if (!item) {
    return null; // Don't render if item data isn't loaded
  }

  return (
    <div className="cart-item-container">
      <div className="cart-item-card">
        <div className="cart-item-image">
          <img 
            src={item.images?.[0] || "../../assets/bg.jpg"} 
            alt={item.name} 
          />
        </div>
        <div className="cart-item-content">
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          <p>Category: {item.category}</p>
          <p>Condition: {item.condition}</p>
          <p>Quantity: {cartItem.quantity}</p>
          <p>{item.description}</p>
          <button onClick={handleRemove} className="remove-button">
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
