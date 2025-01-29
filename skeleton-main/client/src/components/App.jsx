import React, { useState, useEffect, createContext } from "react";
import { get, post } from "../utilities";
import { socket } from "../client-socket";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "../utilities.css";
import "./pages/pages.css";
import NavBar from "./modules/NavBar.jsx";

export const UserContext = createContext(null);

export const CartContext = createContext();

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    get("/api/whoami")
      .then((user) => {
        if (user._id) {
          setUserId(user._id);
        }
      });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
  };

  // Load cart items from database when user logs in
  useEffect(() => {
    if (userId) {
      get("/api/cart").then((items) => {
        setCartItems(items || []);
      });
    } else {
      setCartItems([]); // Clear cart when user logs out
    }
  }, [userId]);

  const addToCart = async (item) => {
    try {
      if (item.seller_id === userId) {
        return;
      }
      const updatedItems = await post("/api/cart/add", { item });
      setCartItems(updatedItems);
    } catch (err) {
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/remove/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedItems = await response.json();
      setCartItems(updatedItems || []);
    } catch (err) {
    }
  };

  const clearCart = async () => {
    try {
      await post("/api/cart/clear");
      setCartItems([]);
    } catch (err) {
    }
  };

  // If we're already at /login and not logged in, just render the login page
  if (location.pathname === "/login" && !userId) {
    return (
      <UserContext.Provider value={authContextValue}>
        <Outlet />
      </UserContext.Provider>
    );
  }

  // For all other routes, check authentication
  return (
    <div className="App-container">
      <UserContext.Provider value={authContextValue}>
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
          {userId ? (
            <>
              <NavBar userId={userId} />
              <div className="page-container">
                <Outlet />
              </div>
            </>
          ) : location.pathname === "/instructions" ? (
            <Outlet />
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )}
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
