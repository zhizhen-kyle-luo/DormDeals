import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const handleClick = () => {
    // Open in new tab
    window.open(`/OrderDetails/${order._id}`, "_blank");
  };

  return (
    <div className="OrderCard-container" onClick={handleClick}>
      <div className="OrderCard-imageContainer">
        <img
          src={order.images[0]} // First image as cover
          alt={order.name}
          className="OrderCard-image"
        />
      </div>
      <div className="OrderCard-info">
        <h3 className="OrderCard-title">{order.name}</h3>
        <div className="OrderCard-details">
          <span className="OrderCard-price">${order.price}</span>
          <span className="OrderCard-category">{order.category}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
