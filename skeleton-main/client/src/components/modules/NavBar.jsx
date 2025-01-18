import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// Import images
import newOrderIcon from "../../assets/plus_sign.jpg";
import cartIcon from "../../assets/shopping_cart.webp";

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
          <img src={newOrderIcon} alt="New Order" className="New-order-icon"/>
        </Link>
        <Link to={`/Cart/${props.userId}`} className="NavBar-link">
          <img src={cartIcon} alt="Shopping Cart" className="Cart-icon"/>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
