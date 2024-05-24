import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Nav = (props) => {
  return (
    <>
      <StyledLink to={`${props.link}`}> 
          {props.value ? <span>|</span> : null}
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
  /* background-color: azure; */
  color: inherit;
  display: flex;
  align-items: center;
  /* background-color: blue; */
  justify-content: center;
  gap: 6px;

  &:hover {
    color: #0073e6; // Change this to your desired hover color
  }

  &:focus {
    outline: 2px solid #0073e6; // Change this to your desired focus outline color
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

// const NavItem = styled.div`
//   height: 50px;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   /* background-color: blue; */
//   justify-content: center;
//   gap: 6px;
//   span {
//     font-size: 1.7rem;
//     font-weight: 500;
//     position: relative;
//     right: 37px;
//   }
// `;

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