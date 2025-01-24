import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { Routes, Route } from "react-router-dom";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App.jsx";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import Cart from "./Cart.jsx";
import NewPage from "./NewPage.jsx";
import NavBar from "../modules/NavBar.jsx";
import OrderDetails from "./OrderDetails.jsx";
import UserAllItems from "./UserAllItems.jsx";
import UserReviews from "./UserReviews.jsx";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <div className="App-container">
      <NavBar userId={userId} />
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
      <Routes>
        <Route path="/" element={userId ? <Home /> : <div>Please log in</div>} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/NewPage/:userId" element={<NewPage />} />
        <Route path="/Cart/:userId" element={<Cart />} />
        <Route path="/OrderDetails/:orderId" element={<OrderDetails />} />
        <Route path="/UserAllItems/:userId" element={<UserAllItems />} />
        <Route path="/UserReviews/:userId" element={<UserReviews />} />
      </Routes>
    </div>
  );
};

export default Skeleton;
