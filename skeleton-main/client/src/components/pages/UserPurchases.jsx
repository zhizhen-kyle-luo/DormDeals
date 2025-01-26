import { React, useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../App.jsx";
import OrderCard from "./OrderCard";
import "./UserPurchases.css";

const UserPurchases = () => {
  const { userId } = useParams();
  const { userId: currentUserId } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Only fetch purchases if viewing own purchases
    if (userId === currentUserId) {
      get("/api/purchases", { userId: userId }).then((purchasedItems) => {
        setPurchases(purchasedItems);
      });
    }
  }, [userId, currentUserId]);

  return (
    <div className="Purchases-container">
      <h1>My Purchases</h1>
      <div className="Purchases-grid">
        {purchases.map((item) => (
          <div key={item._id} className="Purchase-item">
            <OrderCard order={item} />
            <div className="Purchase-status">
              Status: {item.status}
            </div>
            <div className="Purchase-date">
              Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
            </div>
          </div>
        ))}
        {purchases.length === 0 && (
          <div className="No-purchases">
            <p>You haven't made any purchases yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPurchases;
