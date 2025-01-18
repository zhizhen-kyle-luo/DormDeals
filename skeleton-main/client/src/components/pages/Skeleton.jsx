import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import NavBar from "../modules/NavBar.jsx";
import NotFound from "./NotFound.jsx";
import ProtectedRoute from "../modules/ProtectedRoute.jsx";

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
              <ProtectedRoute userId={userId}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute userId={userId}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Skeleton;
