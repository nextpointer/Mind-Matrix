import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader"; // Import Loader component
import { useAlert } from "../Store/useAlert";
import Alert from "../Components/Alert";

export const Nav = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for logout
  const {_,setAlert}  =useAlert()
  const handleLogout = async () => {
    setLoading(true); // Start loading

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

      {/* Show loader if logging out */}
      {loading && <Loader barcolor='var(--primary-color)' bg='white'/>}

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
    // background-color: #f0f0f0; 
    color: var(--primary-color); 
    font-weight: bold;
  `}

  &:hover {
    color: #0073e6; 
  }

  &:active {
    color: var(--primary-color); 
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
