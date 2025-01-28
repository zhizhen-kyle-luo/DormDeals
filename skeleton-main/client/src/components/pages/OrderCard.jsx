import React from "react";
import { Link } from "react-router-dom";
import { getCategoryWithEmoji } from "../../utilities/categoryUtils";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
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
              <span className="OrderCard-badge sold">SOLD</span>
              {!order.reviewed && <span className="OrderCard-badge not-reviewed">Not Reviewed</span>}
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
          <span className="OrderCard-price">${order.price}</span>
          <div className="OrderCard-category-container">
            <span className="OrderCard-category">{getCategoryWithEmoji(order.category)}</span>
            <span className="OrderCard-condition">{order.condition}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
