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
  const [isLoadingItems, setIsLoadingItems] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    get(`/api/user`, { userid: props.userId, picture: defaultpfpimg }).then((sellerObj) => {
      setSeller(`All Items Sold by ${sellerObj[0].name}`);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoadingItems(true);
    get("/api/userallitems", { seller_id: props.userId }).then((orderObjs) => {
      setOrders(orderObjs);
      setIsLoadingItems(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="Items-container">
        <div className="Loading-spinner">Loading seller information...</div>
      </div>
    );
  }

  return (
    <div className="Items-container">
      <h1>{seller}</h1>
      <div className="Items-grid">
        {isLoadingItems ? (
          <div className="Loading-spinner">Loading items...</div>
        ) : orders.length === 0 ? (
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
