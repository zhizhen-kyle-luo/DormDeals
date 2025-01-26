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

  useEffect(() => {
    get(`/api/user`, { userid: props.userId, picture: defaultpfpimg }).then((sellerObj) => {
      setSeller(`All Items Sold by ${sellerObj[0].name}`);
    });
  }, []);

  useEffect(() => {
    get("/api/userallitems", { seller_id: props.userId }).then((orderObjs) => {
      setOrders(orderObjs);
    });
  }, []);

  return (
    <div className="Items-container">
      <h1>{seller}</h1>
      <div className="Items-grid">
        {orders.map((order) => (
          <OrderCard className="Item" key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Home;
