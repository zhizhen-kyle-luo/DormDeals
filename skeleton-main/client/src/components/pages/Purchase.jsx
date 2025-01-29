import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App.jsx";
import { CartContext } from "../App.jsx";
import { post } from "../../utilities";
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
      console.log("Starting purchase process for items:", items);
      // Update each item's status to "Under Transaction" and add buyer info
      const updatePromises = items.map((item) =>
        post("/api/items/update", {
          itemId: item.itemId || item._id,
          status: "Under Transaction",
          buyer_id: userId,
          purchaseDate: new Date().toISOString(),
        }).then((response) => {
          console.log("Updated item:", response);
          return response;
        })
      );

      const updatedItems = await Promise.all(updatePromises);
      console.log("All items updated:", updatedItems);

      // Clear the cart after successful purchase
      await clearCart();
      console.log("Cart cleared");

      // Reset processing state before navigation
      setIsProcessing(false);

      // Navigate to user purchases page
      navigate(`/UserPurchases/${userId}`);
    } catch (error) {
      console.error("Error processing purchase:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="Purchase-container">
      <div className="Purchase-header">
        <h1>Purchase Summary</h1>
      </div>
      
      <div className="Purchase-content">
        <div className="Purchase-items">
          {items.map((item) => (
            <div key={item._id} className="Purchase-item">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="Purchase-itemImage" 
              />
              <div className="Purchase-itemInfo">
                <h3 className="Purchase-itemName">{item.name}</h3>
                <div className="Purchase-itemDetails">
                  <span className="Purchase-itemCategory">{item.category} 🛍️</span>
                  <span className="Purchase-itemCondition">{item.condition}</span>
                </div>
              </div>
              <div className="Purchase-itemPrice">
                ${Number(item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="Purchase-summary">
          <h2 className="Purchase-summaryTitle">Order Summary</h2>
          <div className="Purchase-total">
            <span className="Purchase-totalLabel">Total</span>
            <span className="Purchase-totalAmount">
              ${total.toFixed(2)}
            </span>
          </div>
          
          <div className="Purchase-note">
            Note: After confirming your purchase, the item will be marked as "Under Transaction". 
            The seller will mark it as "Sold" after the in-person exchange is completed.
          </div>

          <div className="Purchase-actions">
            <button 
              className="Purchase-backButton" 
              onClick={() => navigate(-1)} 
              disabled={isProcessing}
            >
              Back
            </button>
            <button
              className="Purchase-confirmButton"
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
