import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx";
import { CartContext } from "../App.jsx";
import './purchase.css';

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
      // Update item status to "Under Transaction" and add to user's purchases
      for (const item of items) {
        await fetch(`/api/items/${item._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            status: 'Under Transaction',
            buyer_id: userId,
            purchaseDate: new Date().toISOString()
          }),
        });
      }
      // Clear the cart after successful purchase
      await clearCart();
      navigate(`/UserPurchases/${userId}`);
    } catch (error) {
      console.error('Error processing purchase:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="purchase-container">
      <div className="purchase-content">
        <h1>Purchase Summary</h1>
        
        <div className="purchase-items">
          <h2>Items</h2>
          {items.map((item) => (
            <div key={item._id} className="purchase-item">
              <div className="item-image">
                <img src={item.images[0]} alt={item.title} />
              </div>
              <div className="item-details">
                <h3>{item.title}</h3>
                <div className="item-category">{item.category}</div>
                <div className="item-condition">{item.condition}</div>
              </div>
              <div className="item-price">${item.price}</div>
            </div>
          ))}
        </div>

        <div className="purchase-summary">
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="transaction-note">
            Note: After confirming your purchase, the item will be marked as "Under Transaction". 
            The seller will mark it as "Sold" after the in-person exchange is completed.
          </div>
        </div>

        <div className="purchase-actions">
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
            disabled={isProcessing}
          >
            Back
          </button>
          <button 
            className="confirm-button" 
            onClick={handleConfirmPurchase}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
