import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { UserContext } from "../App.jsx";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  // const navigate = useNavigate();

  const getRandomStyle = () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    fontSize: `${25 + Math.random() * 10}px`,
  });

  // React.useEffect(() => {
  //   if (userId) {
  //     navigate("/home");
  //   }
  // }, [userId, navigate]);

  return (
    <div className="Login-container">
      <div className="floating-background">
        {[...Array(20)].map((_, index) => (
          <span key={index} className="floating-text" style={getRandomStyle()}>MIT🦫</span>
          
        ))}
      </div>
      <div className="electric-border">
      <div className="main_div">
      <h1 style={{color: "red"}}>Login to MIT Marketplace</h1>
      <div className="Login-google">
        {userId ? (
          <button
            className="Login-logout"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={(err) => console.log("Login Failed:", err)}
          />
        )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
