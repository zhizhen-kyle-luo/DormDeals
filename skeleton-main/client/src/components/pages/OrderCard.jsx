import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const handleClick = () => {
    // Open in new tab
    window.open(`/OrderDetails/${order._id}`, "_blank");
  };

  return (
    <div className="OrderCard-container" onClick={handleClick}>
      <div className="OrderCard-badge">
        {order.status === "Under Transaction" && <span className="badge-transaction">Under Transaction</span>}
        {order.status === "Sold" && <span className="badge-sold">Sold</span>}
      </div>
      <div className="OrderCard-imageContainer">
        <img
          src={order.images[0]} // First image as cover
          alt={order.name}
          className="OrderCard-image"
        />
      </div>
      <div className="OrderCard-info">
        <h3 className="OrderCard-title">{order.name}</h3>
        <div className="OrderCard-meta">
          <span className="OrderCard-seller">
            <i className="fas fa-user"></i> {order.seller}
          </span>
          <span className="OrderCard-condition">{order.condition}</span>
        </div>
        <div className="OrderCard-details">
          <span className="OrderCard-price">${order.price}</span>
          <span className="OrderCard-category">{order.category}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
