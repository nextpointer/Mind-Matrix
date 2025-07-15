import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/axios.config";
import "../styles/login.css";
import "../styles/register.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAlert } from "../Store/useAlert";

export const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Gender: "",
  });

  const { setAlert } = useAlert();

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [touched, setTouched] = useState({}); // Track touched fields
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const currentUser = useAuthStore((s) => s.currentUser);
  const isAuthenticated = !!currentUser;
  const navigate = useNavigate();
  const [showLongLoadMessage, setShowLongLoadMessage] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/user/dashboard" replace />;
  }

  useEffect(() => {
    let timer;
    if (isSubmitting) {
      timer = setTimeout(() => {
        setShowLongLoadMessage(true);
      }, 3000);
    } else {
      setShowLongLoadMessage(false);
    }
    return () => clearTimeout(timer);
  }, [isSubmitting]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "FirstName":
      case "LastName":
        if (!value.trim()) error = "This field is required";
        break;
      case "Age":
        if (!value || isNaN(value) || value < 13 || value > 120)
          error = "Age must be between 13-120";
        break;
      case "Email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "Password":
        if (value.length < 8) error = "Password must be at least 8 characters";
        else if (!/[A-Z]/.test(value))
          error = "Must contain at least one uppercase letter";
        else if (!/[0-9]/.test(value))
          error = "Must contain at least one number";
        break;
      case "ConfirmPassword":
        if (value !== formData.Password) error = "Passwords do not match";
        break;
      case "Gender":
        if (!value) error = "This field is required";
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true })); // Mark field as touched
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      FirstName: true,
      LastName: true,
      Age: true,
      Email: true,
      Password: true,
      ConfirmPassword: true,
      Gender: true,
    });
    validateForm();

    if (!formValid) return;

    setIsSubmitting(true); // Start loading
    setSubmitError("");
    try {
      const dataToSend = { ...formData };
      delete dataToSend.ConfirmPassword;
      const response = await api.post("/user/register", dataToSend);

      if (response.data) {
        setAlert({
          type: "success",
          message: "User Registered successful!",
          visible: true,
        });
      }

      navigate("/user/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setSubmitError(errorMsg);
      setAlert({
        type: "error",
        message: errorMsg,
        visible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-header-container">
          <Link to={"/"}>
            <ArrowBackIcon />
          </Link>

          <h1 className="register-header">Create Your Account</h1>
        </div>

        <div className="register-box">
          <div className="register-section">
            <form className="form-register" onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-field">
                  <label>First Name</label>
                  <input
                    placeholder="Eg: John"
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    required
                  />
                  {touched.FirstName && errors.FirstName && (
                    <span className="error">{errors.FirstName}</span>
                  )}
                </div>

                <div className="input-field">
                  <label>Last Name</label>
                  <input
                    placeholder="Eg: Doe"
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    required
                  />
                  {touched.LastName && errors.LastName && (
                    <span className="error">{errors.LastName}</span>
                  )}
                </div>
              </div>

              <div className="input-group">
                <div className="input-field">
                  <label>Age</label>
                  <input
                    placeholder="Eg: 18"
                    type="number"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    min="13"
                    max="120"
                  />
                  {touched.Age && errors.Age && (
                    <span className="error">{errors.Age}</span>
                  )}
                </div>

                <div className="input-field">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="Gender"
                        value="Male"
                        checked={formData.Gender === "Male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Gender"
                        value="Female"
                        checked={formData.Gender === "Female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Gender"
                        value="Other"
                        checked={formData.Gender === "Other"}
                        onChange={handleChange}
                      />
                      Other
                    </label>
                  </div>
                  {touched.Gender && errors.Gender && (
                    <span className="error">{errors.Gender}</span>
                  )}
                </div>
              </div>

              <div className="input-field">
                <label>Email</label>
                <input
                  placeholder="Eg: johndoe@example.com"
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
                {touched.Email && errors.Email && (
                  <span className="error">{errors.Email}</span>
                )}
              </div>

              <div className="input-group">
                <div className="input-field">
                  <label>Password</label>
                  <input
                    placeholder="No example :)"
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                  />
                  {touched.Password && errors.Password && (
                    <span className="error">{errors.Password}</span>
                  )}
                </div>

                <div className="input-field">
                  <label>Confirm Password</label>
                  <input
                    placeholder="No example :)"
                    type="password"
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {touched.ConfirmPassword && errors.ConfirmPassword && (
                    <span className="error">{errors.ConfirmPassword}</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={!formValid || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loader"></div> // Loader inside the button
                ) : (
                  "Create Account"
                )}
              </button>
              {showLongLoadMessage && (
                <LongLoadMessage>
                  Server might be waking up, please wait a moment...
                </LongLoadMessage>
              )}

              <div className="login-redirect">
                Already have an account?{" "}
                <Link to="/user/login">Sign in here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const LongLoadMessage = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
`;
