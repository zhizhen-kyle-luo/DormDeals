import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import NavBar from "../modules/NavBar.jsx";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <Router>
      <div className="App-container">
        <NavBar />
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
          <Route
            path="/home"
            element={
              <Home />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Skeleton;
