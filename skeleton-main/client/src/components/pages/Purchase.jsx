import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App.jsx";
import { CartContext } from "../App.jsx";
import { post } from "../../utilities";
import { getCategoryWithEmoji } from "../../utilities/categoryUtils";
import "./Purchase.css";

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const items = location.state?.items || [];
  const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    try {
      const updatePromises = items.map((item) =>
        post("/api/items/update", {
          itemId: item.itemId || item._id,
          status: "Under Transaction",
          buyer_id: userId,
          purchaseDate: new Date().toISOString(),
        }).then((response) => {
          return response;
        })
      );

      const updatedItems = await Promise.all(updatePromises);

      await clearCart();

      setIsProcessing(false);

      navigate(`/UserPurchases/${userId}`);
    } catch (error) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="purchase-container">
      <div className="purchase-content">
        <h1>Purchase Summary</h1>

        <div className="purchase-items">
          <h2>Items ({items.length})</h2>
          {items.map((item) => (
            <div key={item._id} className="purchase-item">
              <div className="item-image">
                <img src={item.images[0]} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <div className="item-tags">
                  <span className="item-category">
                    {item.category ? getCategoryWithEmoji(item.category) : "Electronics 💻"}
                  </span>
                  <span className="item-condition">
                    {item.condition === "like-new" ? "Like New" : 
                     item.condition ? item.condition.charAt(0).toUpperCase() + item.condition.slice(1) : 
                     "Like New"}
                  </span>
                </div>
              </div>
              <div className="item-price">${Number(item.price).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="purchase-summary">
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="transaction-note">
          Note: After confirming your purchase, the item will be marked as "Under Transaction".
          The seller will mark it as "Sold" after the in-person exchange is completed.
        </div>

        <div className="purchase-actions">
          <button className="back-button" onClick={() => navigate(-1)} disabled={isProcessing}>
            Back
          </button>
          <button
            className="confirm-button"
            onClick={handleConfirmPurchase}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
