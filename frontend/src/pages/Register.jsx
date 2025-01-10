import Input from "../Components/Input";
import "../styles/login.css";
import "../styles/register.css";
import RadioInput from "../Components/RadioInput";
// import Toggle from "../Components/Toggle";
import NormalButtons from "../Components/NormalButton";
import { Link } from "react-router-dom";
import { api } from "../lib/axios.config";
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
    IsCounsellor:false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.Password !== formData.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const dataToSend = {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Age: formData.Age,
        Email: formData.Email,
        IsStudent: formData.IsStudent,
        IsSubscribed: formData.IsSubscribed,
        Password: formData.Password,
        Gender: formData.Gender,
        IsCounsellor:formData.IsCounsellor
      };
      console.log(dataToSend);
      const response = await api.post("/user/register", formData);
      console.log(response.data);
      alert("Registered successfully");
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      console.error("There was an error registering!", error);
      // Handle error (e.g., display error message)
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
                  label="FirstName"
                  width="100%"
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                />
                <Input
                  label="Last Name"
                  width="100%"
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
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
                />
                <RadioInput
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
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
                />
                <Input
                  label="ConfirmPassword"
                  width="100%"
                  type="password"
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="register-submit">
                <NormalButtons text="Create An Account" type="submit" />
              </div>
              <div className="regsiter-redirect-login">
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
          <img src="/images/signupp.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
