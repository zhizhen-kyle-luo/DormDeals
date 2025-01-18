import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

const Login = ({ handleLogin }) => {
  return (
    <div className="Login-container">
      <h1>Welcome to MIT Marketplace</h1>
      <div className="Login-google">
        <GoogleLogin 
          onSuccess={handleLogin} 
          onError={(err) => console.log(err)} 
        />
      </div>
    </div>
  );
};

export default Login; 