import { React, useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";

import "./UserPurchases.css";

const UserPurchases = () => {
  let props = useParams();

  return (
    <div className="Purchases-container">
      <h1>My Purchases</h1>
    </div>
  );
};

export default UserPurchases;
