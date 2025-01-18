import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
      </div>
      <div className="NavBar-linkContainer">
        <Link to={`/profile/${props.userId}`} className="NavBar-link">
          Profile
        </Link>
        <Link to={`/NewPage/${props.userId}`} className="NavBar-link">
          New Order
        </Link>
        <Link to={`/Cart/${props.userId}`} className="NavBar-link">
          Shopping Cart
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
