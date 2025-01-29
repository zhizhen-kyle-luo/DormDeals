import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";
import { UserContext } from "../App.jsx";
import OrderCard from "./OrderCard";
import "./UserPurchases.css";

const UserPurchases = () => {
  const { userId } = useParams();
  const { userId: currentUserId } = useContext(UserContext);
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId === currentUserId) {
      setIsLoading(true);
      get("/api/purchases", { userId })
        .then((purchasedItems) => {
          setPurchases(Array.isArray(purchasedItems) ? purchasedItems : []);
        })
        .catch((error) => {
          setPurchases([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId, currentUserId]);

  if (isLoading) {
    return (
      <div className="Items-container">
        <div>Loading...</div>
      </div>
    );
  }

  const ongoingOrders = purchases.filter((item) => item.status === "Under Transaction");
  const pastOrders = purchases.filter((item) => item.status === "Sold");

  return (
    <div className="Items-container">
      <h1>My Purchases</h1>
      
      <div className="Items-section">
        <h2>Ongoing Orders</h2>
        <div className="Items-grid">
          {ongoingOrders.length === 0 ? (
            <div className="No-items">No ongoing orders</div>
          ) : (
            ongoingOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          )}
        </div>
      </div>

      <div className="Items-section">
        <h2>Past Orders</h2>
        <div className="Items-grid">
          {pastOrders.length === 0 ? (
            <div className="No-items">No completed orders yet</div>
          ) : (
            pastOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          )}
        </div>
      </div>

      {purchases.length === 0 && (
        <div className="No-items">
          <p>You haven't made any purchases yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserPurchases;
