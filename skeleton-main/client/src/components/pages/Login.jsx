import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { post } from "../../utilities";

const Login = () => {
  const navigate = useNavigate();

  const getRandomStyle = () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    fontSize: `${25 + Math.random() * 10}px`,
  });

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google login success, got credential:", credentialResponse);
    const userToken = credentialResponse.credential;
    post("/api/login", { token: userToken })
      .then((user) => {
        console.log("Login API response:", user);
        if (user._id) {
          console.log("Login successful, navigating to home");
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error("Login API error:", err);
      });
  };

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
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={(err) => console.log("Google Login Failed:", err)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
