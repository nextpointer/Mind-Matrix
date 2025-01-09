import Input from "../Components/Input";
import "../styles/login.css";
import "../styles/register.css";
import RadioInput from "../Components/RadioInput";
import NormalButtons from "../Components/NormalButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    Email: "",
    IsStudent: false,
    IsSubscribed: false,
    Password: "",
    ConfirmPassword: "",
    Gender: "",
    IsCounsellor: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.FirstName) errors.FirstName = "First name is required.";
    if (!formData.LastName) errors.LastName = "Last name is required.";
    if (!formData.Age || isNaN(formData.Age))
      errors.Age = "Age is required and must be a number.";
    if (!formData.Email || !/^\S+@\S+\.\S+$/.test(formData.Email))
      errors.Email = "Valid email is required.";
    if (!formData.Gender) errors.Gender = "Gender selection is required.";
    if (!formData.Password)
      errors.Password = "Password is required.";
    else if (formData.Password.length < 6)
      errors.Password = "Password must be at least 6 characters.";
    if (formData.Password !== formData.ConfirmPassword)
      errors.ConfirmPassword = "Passwords do not match.";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/user/register",
          formData
        );
        alert("Registration successful!");
        // Redirect or perform further actions
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Registration failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div id="homepage-logo-login-bar">
        <div className="homepage-logo-section">
          <Link to={"/"} className="logo-link">
            <p>MIND MATRIX</p>
          </Link>
        </div>
      </div>
      <h1 className="register-header">
        <span>Create Your Account</span>
      </h1>
      <div id="login-page-container">
        <div className="login-box">
          <div className="register-section">
            <form className="form-register" onSubmit={handleSubmit}>
              <div className="register-name">
                <Input
                  label="First Name"
                  width="100%"
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  error={formErrors.FirstName}
                />
                <Input
                  label="Last Name"
                  width="100%"
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  error={formErrors.LastName}
                />
              </div>
              <div className="register-details">
                <Input
                  label="Age"
                  width="100%"
                  type="text"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  error={formErrors.Age}
                />
                <RadioInput
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  error={formErrors.Gender}
                />
              </div>
              <div className="register-email">
                <Input
                  label="Email"
                  width="100%"
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  error={formErrors.Email}
                />
              </div>
              <div className="register-password">
                <Input
                  label="Password"
                  width="100%"
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  error={formErrors.Password}
                />
                <Input
                  label="Confirm Password"
                  width="100%"
                  type="password"
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  error={formErrors.ConfirmPassword}
                />
              </div>
              <div className="register-submit">
                <NormalButtons
                  text={isSubmitting ? "Submitting..." : "Create An Account"}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
              <div className="register-redirect-login">
                <p>
                  Already have an account?{" "}
                  <span>
                    <Link to="/user/login"> Login</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
          <div className="register-illustration">
            <img src="/images/signupp.svg" alt="Sign Up Illustration" />
          </div>
        </div>
      </div>
    </>
  );
};
