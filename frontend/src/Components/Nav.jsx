import styled from "styled-components";
import PropTypes from 'prop-types';

export const Nav = (props) => {
  return (
    <>
      <NavItem>
        {props.value ? <span>|</span> : null}
        <NavContainer>
          <NavIcon>
            <img src={props.icon} alt="<>" />
          </NavIcon>
          <NavItemName>
            <p>{props.label}</p>
          </NavItemName>
        </NavContainer>
      </NavItem>
    </>
  );
}

const NavItem = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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

const NavItemName = styled.div`
`;

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
  value: PropTypes.bool.isRequired
};
