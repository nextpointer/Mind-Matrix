import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// import Loader from "../Components/Loader"; // Removed
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
    setLoading(true); // Start loading

    try {
      await api.post("/user/logout");
      logout(); // Clear auth state

      setAlert({ type: "success", message: "Logout successful!", visible: true });
      setTimeout(() => navigate("/user/login"), 2000);
    } catch (error) {
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
      {loading && (
        <LoaderOverlay>
          <CircularLoader />
        </LoaderOverlay>
      )}

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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top of other content */
`;

const CircularLoader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid var(--primary-color); /* Primary color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const StyledLink = styled(Link)`
  height: 50px;
  width: 100%;
  text-decoration: none;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 18px;
  transition: all 0.2s ease-in-out;
  padding: 0 15px;
  box-sizing: border-box;

  ${(props) =>
    props.isactive === "true" &&
    `
    color: var(--primary-color);
    font-weight: 600;
    background-color: rgba(59, 130, 246, 0.1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  `}

  &:hover {
    color: #1f2937;
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    color: var(--primary-color);
    background-color: rgba(59, 130, 246, 0.15);
  }

  @media (max-width: 767px) {
    height: 45px;
    padding: 0 10px;
    gap: 8px;
  }
`;

const NavIcon = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    height: 20px;
    width: 20px;
  }

  @media (max-width: 767px) {
    height: 25px;
    width: 25px;

    img {
      height: 18px;
      width: 18px;
    }
  }
`;

const NavItemName = styled.div`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    font-size: 1rem;
    text-align: left;
    margin: 0;
  }

  @media (max-width: 767px) {
    p {
      font-size: 0.9rem;
      text-align: left;
    }
  }
`;

const NavContainer = styled.div`
  height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

Nav.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};
