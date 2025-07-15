import React, { useState, useContext } from 'react';
import { Nav } from './Nav';
import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import styled from "styled-components";
import { useAuthStore } from "../Store/authStore";


export const NavSection = () => {
  const { currentUser } = useAuthStore() || {};
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", icon: "https://api.iconify.design/lucide:home.svg", link: "/user/dashboard" },
    { label: "Meditation", icon: "https://api.iconify.design/lucide:leaf.svg", link: "/user/meditation" },
    { label: "AI", icon: "https://api.iconify.design/lucide:bot.svg", link: "/user/ai" },
    { label: "Counsellor", icon: "https://api.iconify.design/lucide:stethoscope.svg", link: "/user/counsellor" },
    { label: "Videos", icon: "https://api.iconify.design/lucide:play-circle.svg", link: "/user/video" },
    { label: "About", icon: "https://api.iconify.design/lucide:info.svg", link: "/about" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavSectionWrapper>
      <StyledHamburgerButton
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isOpen ? <KeyboardDoubleArrowLeftTwoToneIcon /> : <KeyboardDoubleArrowRightTwoToneIcon />}
      </StyledHamburgerButton>

      {isOpen && (
        <StyledMobileOverlay
          onClick={toggleMenu}
        ></StyledMobileOverlay>
      )}

      <StyledNavbarSection isOpen={isOpen}>
        <StyledDashboardLogo>
          <img src="/Icons/logo.png" alt="" />
          <p>MINDMATRIX</p>
        </StyledDashboardLogo>

        <StyledProfileSection>
          <div className="avatar-container">
            <Avatar sx={{ width: "100%", height: "100%", bgcolor: "var(--primary-color)", color: "white", fontSize: "2.5rem", fontWeight: "normal" }}>
              {currentUser?.FirstName?.at(0)}
            </Avatar>
          </div>
          <p className="profile-name">
            {currentUser?.FirstName} {currentUser?.LastName}
          </p>
        </StyledProfileSection>

        <StyledNavigationLinksSection>
          {navItems.map((item) => (
            <Nav key={item.label} label={item.label} icon={item.icon} link={item.link} value={true} />
          ))}
        </StyledNavigationLinksSection>

        <StyledLogoutSection>
          <Nav label="Logout" icon="https://api.iconify.design/lucide:log-out.svg" link="/logout" value={false} />
        </StyledLogoutSection>
      </StyledNavbarSection>
    </NavSectionWrapper>
  );
};

const NavSectionWrapper = styled.div`
  display: flex;
`;

const StyledHamburgerButton = styled.button`
  @media (min-width: 768px) {
    display: none;
  }
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color:#3b82f6;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  outline: none;
  border: none;
  cursor: pointer;
  &:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;

const StyledMobileOverlay = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 980;
`;

const StyledNavbarSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 16rem;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  transition: transform 0.3s ease-in-out;
  z-index: 990;

  @media (max-width: 767px) {
    transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
    height: 100vh;
    width: 80vw;
    border-radius: 0;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    overflow-y: auto;
    padding: 1.5rem 1rem;
  }

  @media (min-width: 768px) {
    position: relative;
    transform: translateX(0);
    border-radius: 1rem;
    height: 98vh;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
    width: 16rem;
    overflow-y: hidden;
  }
`;

const StyledDashboardLogo = styled.div`
  width: 100%;
  height: 5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;

  p {
    font-size: 1rem;
    letter-spacing: 0.05em;
    font-weight: 500;
    color: #1f2937;
  }
  img{
    height: 25px;
    width: 50px;
  }
`;

const StyledProfileSection = styled.div`
  width: 100%;
  height: 10rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;

  .avatar-container {
    width: 5rem;
    height: 5rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid #d1d5db;
  }

  .profile-name {
    font-size: 1.25rem;
    font-weight: 500;
    color: #1f2937;
  }

  .profile-type {
    font-size: 1rem;
    color: #4b5563;
    margin-top: -0.5rem;
  }
`;

const StyledNavigationLinksSection = styled.div`
  flex-grow: 1;
  width: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  padding: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  overflow-y: hidden;

  @media (max-width: 767px) {
    overflow-y: hidden;
  }
`;

const StyledLogoutSection = styled.div`
  width: 100%;
  height: 4rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;
