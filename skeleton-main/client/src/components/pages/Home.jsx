import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import OrderCard from "./OrderCard";
import "./Home.css";

const Home = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    get("/api/orders").then((orderObjs) => {
      setOrders(orderObjs);
    });
  }, []);

  return (
    <div className="Home-container">
      <h1>Available Items</h1>
      <div className="Home-orderGrid">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Home;
