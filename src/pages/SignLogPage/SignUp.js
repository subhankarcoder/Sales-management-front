import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../assests/images/login_img.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase-config";
import axios from "axios";

const SignUp = () => {
  const api_endpoint = "http://localhost:8000/";
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [sp_id, setSp_id] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    sp_id: "",
  });
  const navigate = useNavigate();

  const register = () => {
    setFormData({
      username: registerEmail,
      password: registerPassword,
      sp_id: sp_id,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);

    // Check if the form data is not empty before making the API call
    if (formData.username && formData.password && formData.sp_id) {
      try {
        // Make sure the form is submitted only once
        setFormData({
          username: "",
          password: "",
          sp_id: "",
        });

        await axios
          .post(`${api_endpoint}details/sales-person-details`, formData)
          .then(async(res) => {
            const user = await createUserWithEmailAndPassword(
              auth,
              registerEmail,
              registerPassword
            );
            console.log("Success creating new user");
            navigate("/home");
          })
          .catch((err) => {
            console.log("Error while creating user");
          });
        console.log("API call successful");

        // You can navigate or perform other actions after a successful API call
      } catch (err) {
        console.log("Error making API call:", err);
      }
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [formData]);
  return (
    <div className="sign-up">
      <div className="sign-up-box">
        <div className="image">
          <img src={Login} />
        </div>
        <div className="login-form">
          <h2>Welcome Mate!</h2>
          <p>
            Give your full name as usename and a strong password. Give correct
            employee id to sign Up.
          </p>
          <div className="form">
            <input
              type="text"
              placeholder="Enter your name..."
              onChange={(e) => setRegisterEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter password..."
              onChange={(e) => setRegisterPassword(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Enter employee id..."
              onChange={(e) => setSp_id(e.target.value)}
            ></input>
            <button onClick={register}>Sign Up</button>
            <div>
              <p>already have an account?</p>
              <div className="log-text">
                <p>already have an account?</p>
                <Link to={"/login"} href="#">login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
