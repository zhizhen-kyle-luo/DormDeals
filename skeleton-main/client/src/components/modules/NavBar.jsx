import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../App.jsx";
// Import images
import newOrderIcon from "../../assets/plus_sign.png";
import cartIcon from "../../assets/shopping_cart.png";
import profileIcon from "../../assets/profile.webp";

const NavBar = () => {
  const { userId } = useContext(UserContext);

  if (!userId) return null;

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title">
        <Link to="/" className="NavBar-link" title="Home">
          MIT Marketplace
        </Link>
      </div>
      <div className="NavBar-linkContainer">
        <Link to={`/profile/${userId}`} className="NavBar-link" title="Profile">
          <img src={profileIcon} alt="Profile" className="Profile-icon" />
        </Link>
        <Link to={`/NewPage/${userId}`} className="NavBar-link" title="New Order">
          <img src={newOrderIcon} alt="New Order" className="New-order-icon" />
        </Link>
        <Link to={`/Cart/${userId}`} className="NavBar-link" title="Shopping Cart">
          <img src={cartIcon} alt="Shopping Cart" className="Cart-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
