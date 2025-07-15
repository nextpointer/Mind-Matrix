import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Components/Loader";
import { useAlert } from "../Store/useAlert";
import { api } from "../lib/axios.config";
import { useAuthStore } from "../Store/authStore";

export const Nav = (props) => {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { _, setAlert } = useAlert();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await api.post("/user/logout");
      logout();
      setAlert({ type: "success", message: "Logout successful!", visible: true });
      setTimeout(() => navigate("/user/login"), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
      setAlert({ type: "error", message: errorMessage, visible: true });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    if (props.label === "Logout") {
      e.preventDefault();
      handleLogout();
    }
  };

  return (
    <>
      {loading && <Loader barcolor="var(--primary-color)" bg="white" />}

      <StyledLink
        to={props.label === "Logout" ? "#" : props.link}
        isactive={location.pathname === props.link ? "true" : "false"}
        onClick={handleClick}
      >
        <NavContainer>
          <NavIcon>
            <img src={props.icon} alt={props.label} />
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
  color: #4b5563; /* Default text color */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Increased gap for better spacing */
  border-radius: 8px; /* Slightly rounded corners for the link item */
  transition: all 0.2s ease-in-out; /* Smooth transitions for hover/active */
  padding: 0 15px; /* Added horizontal padding */
  box-sizing: border-box; /* Include padding in width calculation */

  ${(props) =>
    props.isactive === "true" &&
    `
    color: var(--primary-color);
    font-weight: 600; /* Slightly bolder for active */
    background-color: rgba(59, 130, 246, 0.1); /* Light blue background for active */
    box-shadow: 0 1px 3px rgba(0,0,0,0.08); /* Subtle shadow for active */
  `}

  &:hover {
    color: #1f2937; /* Darker text on hover */
    background-color: rgba(0, 0, 0, 0.05); /* Light gray background on hover */
  }

  &:active {
    color: var(--primary-color);
    background-color: rgba(59, 130, 246, 0.15); /* Slightly darker active background on click */
  }

  /* No specific span styling needed as p tag is directly used for label */

  @media (max-width: 767px) { /* Adjusted breakpoint for mobile consistency */
    height: 45px; /* Slightly smaller height for mobile */
    padding: 0 10px; /* Adjusted padding for mobile */
    gap: 8px; /* Adjusted gap for mobile */
  }
`;

const NavIcon = styled.div`
  height: 30px; /* Slightly smaller icon container */
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Prevent icon from shrinking */

  img {
    height: 20px; /* Adjusted icon size */
    width: 20px;
  }

  @media (max-width: 767px) { /* Adjusted breakpoint */
    height: 25px;
    width: 25px;

    img {
      height: 18px;
      width: 18px;
    }
  }
`;

const NavItemName = styled.div`
  flex-grow: 1; /* Allow text to take available space */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow if text is too long */
  text-overflow: ellipsis; /* Add ellipsis for overflowed text */

  p {
    font-size: 1rem; /* Standard font size for desktop */
    text-align: left; /* Align text to the left */
    margin: 0; /* Remove default paragraph margin */
  }

  @media (max-width: 767px) { /* Adjusted breakpoint */
    p {
      font-size: 0.9rem; /* Slightly smaller font size for mobile */
      text-align: left; /* Keep text aligned left */
    }
  }
`;

const NavContainer = styled.div`
  height: inherit;
  width: 100%; /* Ensure it takes full width of StyledLink */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align content to the start */
`;

Nav.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};
