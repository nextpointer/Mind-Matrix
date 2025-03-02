import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NormalButtons from "../Components/NormalButton";
import Loader from "../Components/Loader";
import Alert from "../Components/Alert";
import { useAlert } from "../Store/useAlert";
import { useAuthStore } from "../Store/authStore";
import { api } from "../lib/axios.config";
import "../styles/login.css";

export const Login = () => {
  const { login } = useAuthStore();
  const { alert, setAlert } = useAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Helper function to show alerts
  const showAlert = (type, message, duration = 3000) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => setAlert({ type: "", message: "", visible: false }), duration);
  };

  // Form validation
  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const newErrors = {};

    if (!trimmedEmail) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!trimmedPassword) {
      newErrors.password = "Password is required.";
    } else if (trimmedPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setAlert({ ...alert, visible: false }); // Hide any existing alerts

    try {
      const response = await api.post("/user/login", {
        Email: email.trim(),
        Password: password.trim(),
      });

      login(response.data.data.user, response.data.data.AccessToken);
      showAlert("success", "Login successful!");
      navigate("/user/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <br />
      <div className="homepage-logo-section">
        <Link to="/" className="logo-link">
          <p>MIND MATRIX</p>
        </Link>
      </div>
      <h1 className="register-header">
        <span>Welcome Back!</span>
      </h1>

      {/* Show alert if visible */}
      {alert.visible && <Alert type={alert.type} string={alert.message} duration={3000} />}

      <div id="login-page-container">
        <div className="login-box">
          <div className="login-illustration">
            <img src="/images/login.svg" alt="Login Illustration" />
          </div>
          <div className="login-section">
            {loading ? (
              <Loader barcolor="var(--primary-color)" bg="white" />
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="flex-column">
                  <label>Email</label>
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="inputForm">
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex-column">
                  <label>Password</label>
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="inputForm">
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="button-submit">
                  <NormalButtons text="Login" type="submit" />
                </div>

                <p className="p">
                  Don&apos;t have an account?{" "}
                  <span className="span">
                    <Link to="/user/register">Sign Up</Link>
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