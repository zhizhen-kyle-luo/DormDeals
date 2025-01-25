import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import newOrderIcon from "../../assets/plus_sign.png";
import cartIcon from "../../assets/shopping_cart.png";
import profileIcon from "../../assets/profile.webp";
import shopIcon from "../../assets/shop.png";
import bagIcon from "../../assets/shopping_bag.png";
import questionIcon from "../../assets/question_mark.png";

const NavBar = ({ userId }) => {
  if (!userId) return null;

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title">
        <Link to="/" className="NavBar-link" title="Home">
          MIT Marketplace
        </Link>
      </div>
      <div className="NavBar-linkContainer">
        <Link to="/instructions/" className="NavBar-link" title="Instructions">
          <img src={questionIcon} alt="Question Mark" className="Question-icon" />
        </Link>
        <Link to={`/profile/${userId}`} className="NavBar-link" title="Profile">
          <img src={profileIcon} alt="Profile" className="Profile-icon" />
        </Link>
        <Link to={`/NewPage/${userId}`} className="NavBar-link" title="New Order">
          <img src={newOrderIcon} alt="New Order" className="New-order-icon" />
        </Link>
        <Link to={`/cart`} className="NavBar-link" title="Shopping Cart">
          <img src={cartIcon} alt="Shopping Cart" className="Cart-icon" />
        </Link>
        <Link to={`/UserAllItems/${userId}`} className="NavBar-link" title="My Items">
          <img src={shopIcon} alt="Shop" className="Shop-icon" />
        </Link>
        <Link to={`/UserPurchases/${userId}`} className="NavBar-link" title="My Purchases">
          <img src={bagIcon} alt="Shopping Bag" className="Bag-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
