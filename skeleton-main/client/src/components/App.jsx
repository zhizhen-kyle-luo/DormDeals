import React, { useState, useEffect, createContext } from "react";
import { get, post } from "../utilities";
import { socket } from "../client-socket";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import "../utilities.css";

export const UserContext = createContext(null);

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    console.log("App: Checking current user");
    get("/api/whoami").then((user) => {
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

  console.log("App: Current userId:", userId, "Current location:", location.pathname);

  // If we're already at /login, just render the login page
  if (location.pathname === "/login") {
    return (
      <UserContext.Provider value={authContextValue}>
        <Outlet />
      </UserContext.Provider>
    );
  }

  // For all other routes, check authentication
  return (
    <UserContext.Provider value={authContextValue}>
      {userId ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
    </UserContext.Provider>
  );
};

export default App;
