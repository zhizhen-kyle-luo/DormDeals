import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";
import defaultpfpimg from "../../assets/blank-profile.png";

import OrderCard from "./OrderCard";
import "./UserAllItems.css";

const Home = () => {
  let props = useParams();
  const [seller, setSeller] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerLoaded, setSellerLoaded] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    get(`/api/user`, { userid: props.userId, picture: defaultpfpimg })
      .then((sellerObj) => {
        setSeller(`All Items Sold by ${sellerObj[0].name}`);
        setSellerLoaded(true);
      });
  }, []);

  useEffect(() => {
    get("/api/userallitems", { seller_id: props.userId })
      .then((orderObjs) => {
        setOrders(orderObjs);
        setOrdersLoaded(true);
      });
  }, []);

  // Update loading state when both data are loaded
  useEffect(() => {
    if (sellerLoaded && ordersLoaded) {
      setIsLoading(false);
    }
  }, [sellerLoaded, ordersLoaded]);

  if (isLoading) {
    return (
      <div className="Items-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="Items-container">
      <h1>{seller}</h1>
      <div className="Items-grid">
        {orders.length === 0 ? (
          <div className="No-items">No items found</div>
        ) : (
          orders.map((order) => (
            <OrderCard className="Item" key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
