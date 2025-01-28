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
    console.log("App: Checking current user");
    get("/api/whoami")
      .then((user) => {
        console.log("App: whoami response:", user);
        if (user._id) {
          console.log("App: Setting userId to", user._id);
          setUserId(user._id);
        }
      });
  }, []);

  const handleLogin = (credentialResponse) => {
    console.log("App: Handling login");
    const userToken = credentialResponse.credential;
    post("/api/login", { token: userToken }).then((user) => {
      console.log("App: Login response:", user);
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    console.log("App: Handling logout");
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
      // Prevent users from adding their own items to cart
      if (item.seller_id === userId) {
        console.log("Cannot add your own item to cart");
        return;
      }
      const updatedItems = await post("/api/cart/add", { item });
      setCartItems(updatedItems);
    } catch (err) {
      console.log("Failed to add item to cart:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const updatedItems = await fetch(`/api/cart/remove/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json());
      setCartItems(updatedItems);
    } catch (err) {
      console.log("Failed to remove item from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      await post("/api/cart/clear");
      setCartItems([]);
    } catch (err) {
      console.log("Failed to clear cart:", err);
    }
  };

  console.log("App: Current userId:", userId, "Current location:", location.pathname);

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
