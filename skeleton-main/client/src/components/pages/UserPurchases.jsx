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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId === currentUserId) {
      setIsLoading(true);
      get("/api/purchases", { userId })
        .then((purchasedItems) => {
          console.log("Fetched purchases:", purchasedItems);
          setPurchases(Array.isArray(purchasedItems) ? purchasedItems : []);
        })
        .catch((error) => {
          console.error("Error fetching purchases:", error);
          setPurchases([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId, currentUserId]);

  const ongoingOrders = purchases.filter((item) => item.status === "Under Transaction");
  const pastOrders = purchases.filter((item) => item.status === "Sold");

  if (isLoading) {
    return (
      <div className="Purchases-container">
        <div className="Loading-spinner">Loading your purchases...</div>
      </div>
    );
  }

  return (
    <div className="Purchases-container">
      <h1>My Purchases</h1>

      <div className="Purchases-section">
        <h2>Ongoing Orders</h2>
        <div className="Purchases-grid">
          {ongoingOrders.length === 0 ? (
            <div className="No-purchases">
              <p>No ongoing orders.</p>
            </div>
          ) : (
            ongoingOrders.map((item) => (
              <div key={item._id}>
                <OrderCard order={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="Purchases-section">
        <h2>Past Orders</h2>
        <div className="Purchases-grid">
          {pastOrders.length === 0 ? (
            <div className="No-purchases">
              <p>No completed orders yet.</p>
            </div>
          ) : (
            pastOrders.map((item) => (
              <div key={item._id}>
                <OrderCard order={item} />
              </div>
            ))
          )}
        </div>
      </div>

      {purchases.length === 0 && (
        <div className="No-purchases">
          <p>You haven't made any purchases yet.</p>
          <Link to="/" className="Start-shopping">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPurchases;
