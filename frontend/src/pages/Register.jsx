import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/axios.config";
import "../styles/login.css";
import "../styles/register.css";

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

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [touched, setTouched] = useState({}); // Track touched fields

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
    }); // Mark all fields as touched on submit
    validateForm();

    if (!formValid) return;

    try {
      const response = await api.post("/user/register", formData);
      if (response.data.success) {
        alert("Registration successful! Redirecting to login...");
        // Redirect to login page
      }
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-container">
      <div id="homepage-logo-login-bar">
        <div className="homepage-logo-section">
          <Link to="/" className="logo-link">
            <p>MIND MATRIX</p>
          </Link>
        </div>
      </div>

      <div className="register-content">
        <h1 className="register-header">Create Your Account</h1>

        {submitError && <div className="error-banner">{submitError}</div>}

        <div className="register-box">
          <div className="register-section">
            <form className="form-register" onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-field">
                  <label>First Name</label>
                  <input
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
                disabled={!formValid}
              >
                Create Account
              </button>

              <div className="login-redirect">
                Already have an account?{" "}
                <Link to="/user/login">Sign in here</Link>
              </div>
            </form>
          </div>

          <div className="register-illustration">
            <img src="/images/signupp.svg" alt="Signup illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};