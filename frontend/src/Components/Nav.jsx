import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const Nav = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/user/logout',null,{
      withCredentials: true, // Important to send cookies
    });
      // Redirect to the login page after successful logout
      navigate('/user/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
};

  return (
    <StyledLink
      to={props.link}
      isActive={location.pathname === props.link}
      onClick={props.label === 'Logout' ? handleLogout : null}
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
    background-color: #f0f0f0; // Change this to your desired active background color
    color: #0073e6; // Change this to your desired active color
    font-weight: bold;
  `}

  &:hover {
    color: #0073e6; // Change this to your desired hover color
  }

  &:focus {
    /* outline: 2px solid #0073e6; // Change this to your desired focus outline color */
  }

  &:active {
    color: #005bb5; // Change this to your desired active color
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
