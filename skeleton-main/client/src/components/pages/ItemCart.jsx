import React from "react";
import "./ItemCart.css";

/**
 * Component for displaying a single item in the shopping cart
 *
 * Proptypes
 * @param {Object} item - The cart item object containing details like id, name, price, image
 * @param {Object} user - The current user object
 * @param {Function} onRemoveFromCart - Callback function to remove item from cart
 */
const ItemCart = ({ item, user, onRemoveFromCart }) => {
  const handleRemove = () => {
    fetch(`/api/cart/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        // updating the state 
        onRemoveFromCart(item._id);
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="image">
          <img 
            src={item.images?.[0] || "../../assets/bg.jpg"} 
            alt={item.name} 
          />
        </div>
        <div className="content">
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          <p>Category: {item.category}</p>
          <p>Condition: {item.condition}</p>
          <p>{item.description}</p>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
