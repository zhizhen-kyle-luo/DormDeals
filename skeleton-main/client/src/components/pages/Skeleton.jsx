import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../modules/ProtectedRoute.jsx";

import "../../utilities.css";
import "./Skeleton.css";
import { UserContext } from "../App.jsx";
import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import Cart from "./Cart.jsx";
import NewPage from "./NewPage.jsx";
import NavBar from "../modules/NavBar.jsx";
import Login from "./Login.jsx";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <Router>
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
          <Route path="/" element={userId ? <Home /> : <Login handleLogin={handleLogin} />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute userId={userId}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route
            path="/NewPage/:userId"
            element={
              <ProtectedRoute userId={userId}>
                <NewPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Cart/:userId" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Skeleton;
