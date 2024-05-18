import Input from "../Components/Input";
import "../styles/login.css";
import "../styles/register.css";
import RadioInput from "../Components/RadioInput";
// import Toggle from "../Components/Toggle";
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
    IsCounsellor:false
  });

  const handleChange = (e) => {
    console.log(e.target);
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
      const response = await axios.post("http://localhost:8000/api/v1/user/register", formData);
      console.log(response.data);
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      console.error("There was an error registering!", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <>
      <div id="login-page-container">
        <div className="login-box">
          <div className="register-section">
            <form className="form" onSubmit={handleSubmit}>
              <div className="register-name">
                <Input
                  label="FirstName"
                  width="20ch"
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                />
                <Input
                  label="Last Name"
                  width="20ch"
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                />
              </div>
              <div className="register-details">
                <Input
                  label="Age"
                  width="9ch"
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
                  width="25ch"
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
                <div className="register-student">
                  <p>Student</p>
                  {/* <Toggle
                    name="IsStudent"
                    checked={formData.IsStudent}
                    onChange={handleChange}
                  /> */}
                </div>
              </div>
              <div className="register-password">
                <Input
                  label="Password"
                  width="20ch"
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                />
                <Input
                  label="ConfirmPassword"
                  width="20ch"
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
          <div className="container"></div>
          </div>
        </div>
      </div>
    </>
  );
};
