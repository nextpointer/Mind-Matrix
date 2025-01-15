import NormalButtons from "../Components/NormalButton";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Alert from "../Components/Alert"; // Import your Alert component
import { useAlert } from "../Store/useAlert.js";
import { api } from "../lib/axios.config.js";

export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //const [alert, setAlert] = useState({ type: "", message: "", visible: false }); // Alert state
  const navigate = useNavigate();
    const { alert, setAlert } = useAlert();


  // Form validation before sending the request
  const validateForm = () => {
    if (!Email || !Password) {
      setAlert({
        type: "error",
        message: "Please fill in both fields.",
        visible: true,
      });
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(Email)) {
      setAlert({
        type: "error",
        message: "Please enter a valid email address.",
        visible: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Only proceed if the form is valid

    setLoading(true);
    setAlert({ ...alert, visible: false }); // Reset alert before submitting

    try {
      const response = await api.post(
        "/user/login",
        { Email, Password },
        { crossDomain: true, headers: { "Content-Type": "application/json" } }
      );

      // Display success alert
      setAlert({
        type: "success",
        message: "Login successful!",
        visible: true,
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => navigate("/user/dashboard"), 2000);
    } catch (error) {
      // Display error alert
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setAlert({ type: "error", message: errorMessage, visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
          {/* Display alert if visible */}
      {/* {alert.visible && (
        <Alert type={alert.type} string={alert.message} duration={3000} />
      )} */}
    <br />
      <div className="homepage-logo-section">
        <Link to={"/"} className="logo-link">
          <p>MIND MATRIX</p>
        </Link>
      </div>
      <h1 className="register-header">
          <span>Welcome Back!</span>
        </h1>
      {/* Show alert if visible */}
      {alert.visible && (
        <Alert type={alert.type} string={alert.message} duration={3000} />
      )}

      <div id="login-page-container">
        <div className="login-box">
          <div className="login-illustration">
            <img src="/images/login.svg" alt="" />
          </div>
          <div className="login-section">
            {loading ? (
              <Loader barcolor="var(--primary-color)" bg="white"/> // Display loader during request
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                  <label>Email </label>
                </div>
                <div className="inputForm">
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex-column">
                  <label>Password </label>
                </div>
                <div className="inputForm">
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter your Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="button-submit">
                  <NormalButtons text="Login" type="submit" />
                </div>

                <p className="p">
                  Don&apos;t have an account?{" "}
                  <span className="span">
                    <Link to={"/user/register"}>Sign Up</Link>
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
