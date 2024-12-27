import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alert from "../Components/Alert"; // Import Alert component
import Loader from "../Components/Loader"; // Import Loader component

export const Nav = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for logout
  const [alert, setAlert] = useState({ type: "", message: "", visible: false }); // Alert state

  const handleLogout = async () => {
    setLoading(true); // Start loading
    setAlert({ ...alert, visible: false }); // Reset alert

    try {
      await axios.post("http://localhost:8000/api/v1/user/logout", null, {
        withCredentials: true, // Include cookies
      });

      // Display success alert and navigate to login
      setAlert({ type: "success", message: "Logout successful!", visible: true });
      setTimeout(() => navigate("/user/login"), 2000);
    } catch (error) {
      // Display error alert
      const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
      setAlert({ type: "error", message: errorMessage, visible: true });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleClick = (e) => {
    if (props.label === "Logout") {
      e.preventDefault(); // Prevent navigation when clicking Logout
      handleLogout();
    }
  };

  return (
    <>
      {/* Display alert if visible */}
      {alert.visible && (
        <Alert
          type={alert.type}
          string={alert.message}
          duration={3000}
        />
      )}

      {/* Show loader if logging out */}
      {loading && <Loader />}

      <StyledLink
        to={props.label === "Logout" ? "#" : props.link} // Prevent navigation for Logout
        isActive={location.pathname === props.link}
        onClick={handleClick} // Handle logout or default click
      >
        <NavContainer>
          <NavIcon>
            <img src={props.icon} alt="<>" />
          </NavIcon>
          <NavItemName>
            <p>{props.label}</p>
          </NavItemName>
        </NavContainer>
      </StyledLink>
    </>
  );
};

const StyledLink = styled(Link)`
  height: 50px;
  width: 100%;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  ${(props) =>
    props.isActive &&
    `
    background-color: #f0f0f0; 
    color: #0073e6; 
    font-weight: bold;
  `}

  &:hover {
    color: #0073e6; 
  }

  &:active {
    color: #005bb5; 
  }

  span {
    font-size: 1.7rem;
    font-weight: 500;
    position: relative;
    right: 37px;
  }
`;

const NavIcon = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 25px;
    width: 25px;
  }
`;

const NavItemName = styled.div``;

const NavContainer = styled.div`
  height: inherit;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

Nav.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};
