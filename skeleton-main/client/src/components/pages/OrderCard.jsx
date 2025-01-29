import React from "react";
import { Link } from "react-router-dom";
import { getCategoryWithEmoji } from "../../utilities/categoryUtils";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const statusColors = {
    Sold: "u-red",
    "Under Transaction": "u-gold",
    Active: "u-green",
  };
  return (
    <Link to={`/OrderDetails/${order._id}`} className="OrderCard-container">
      <div className="OrderCard-image">
        <img
          src={order.images[0]} // First image as cover
          alt={order.name}
        />
        <div className="OrderCard-badges">
          {order.status === "Sold" && (
            <>
              {!order.reviewed && (
                <span className="OrderCard-badge not-reviewed">Not Reviewed</span>
              )}
            </>
          )}
        </div>
      </div>
      <div className="OrderCard-info">
        <div className="OrderCard-mainInfo">
          <h3 className="OrderCard-title">{order.name}</h3>
          <p className="OrderCard-seller">by {order.seller}</p>
        </div>
        <div className="OrderCard-details">
          <span className="OrderCard-price">${Number(order.price).toFixed(2)}</span>
          <div className="OrderCard-category-container">
            <span className={`OrderCard-status ${statusColors[order.status]}`}>{order.status}</span>
            <span className="OrderCard-category">{getCategoryWithEmoji(order.category)}</span>
            <span className="OrderCard-condition">{order.condition}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
