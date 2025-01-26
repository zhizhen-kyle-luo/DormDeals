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
      get("/api/purchases", { userId }).then((purchasedItems) => {
        console.log('Fetched purchases:', purchasedItems);
        setPurchases(Array.isArray(purchasedItems) ? purchasedItems : []); // Ensure we always have an array
      }).catch(error => {
        console.error('Error fetching purchases:', error);
        setPurchases([]);
      });
    }
  }, [userId, currentUserId]);

  // Separate ongoing and past orders
  const ongoingOrders = purchases.filter((item) => item.status === "Under Transaction");
  const pastOrders = purchases.filter((item) => item.status === "Sold");

  return (
    <div className="Purchases-container">
      <h1>My Purchases</h1>

      <div className="Purchases-section">
        <h2>Ongoing Orders</h2>
        <div className="Purchases-grid">
          {ongoingOrders.map((item) => (
            <div key={item._id} className="Purchase-item">
              <OrderCard order={item} />
              <div className="Purchase-status">Status: {item.status}</div>
              <div className="Purchase-date">
                Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
              </div>
            </div>
          ))}
          {ongoingOrders.length === 0 && (
            <div className="No-purchases">
              <p>No ongoing orders.</p>
            </div>
          )}
        </div>
      </div>

      <div className="Purchases-section">
        <h2>Past Orders</h2>
        <div className="Purchases-grid">
          {pastOrders.map((item) => (
            <div key={item._id} className="Purchase-item">
              <OrderCard order={item} />
              <div className="Purchase-status">Status: {item.status}</div>
              <div className="Purchase-date">
                Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
              </div>
            </div>
          ))}
          {pastOrders.length === 0 && (
            <div className="No-purchases">
              <p>No past orders.</p>
            </div>
          )}
        </div>
      </div>

      {purchases.length === 0 && (
        <div className="No-purchases">
          <p>You haven't made any purchases yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserPurchases;
