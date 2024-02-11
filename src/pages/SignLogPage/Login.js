import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoginImg from "../../assests/images/login_img.jpg";
import { auth } from "../../config/Firebase-config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const api_endpoint = "https://sales-management-back.onrender.com/";
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const userCredential = (await user).user;
      if (userCredential) {
        navigate("/home");
      } else {
        alert("User not found!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="sign-up">
      <div className="sign-up-box">
        <div className="image">
          <img src={LoginImg} />
        </div>
        <div className="login-form">
          <h2>Welcome Back!</h2>
          <p>
            Give your full name as usename and a strong password. Give correct
            employee id to sign Up.
          </p>
          <div className="form">
            <input
              type="text"
              placeholder="Enter your name..."
              onChange={(e) => setLoginEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter password..."
              onChange={(e) => setLoginPassword(e.target.value)}
            ></input>
            <button onClick={login}>Log In</button>
            <div>
              <p>already have an account?</p>
              <div className="log-text">
                <p>Not a member already?</p>
                <Link to={"/"} href="#">
                  register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
