import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title">Website Title</div>
      {props.userId && (
        <Link to={`/profile/${props.userId}`} className="NavBar-link u-inlineBlock">
          Profile
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
