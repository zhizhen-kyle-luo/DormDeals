import React, { useContext, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../App.jsx";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, handleLogin } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      // Navigate to the page they tried to visit or home
      const from = location.state?.from?.pathname || "/home";
      navigate(from, { replace: true });
    }
  }, [userId, navigate, location]);

  const getRandomStyle = () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
    fontSize: `${20 + Math.random() * 10}px`,
  });

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google login success, got credential:", credentialResponse);
    handleLogin(credentialResponse);
  };

  return (
    <div className="Login-container">
      <div className="floating-background">
        {[...Array(20)].map((_, index) => (
          <span key={index} className="floating-text rubik-vinyl-regular" style={getRandomStyle()}>MIT🦫</span>
        ))}
      </div>
      <div className="electric-border">
        <div className="main_div">
          <h1 style={{color: "red"}}>Welcome to DormDeals</h1>
          <div className="Login-google">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={(err) => console.log("Google Login Failed:", err)}
            />
          </div>
          <Link to="/instructions" className="Instructions-button">
            How to use DormDeals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
