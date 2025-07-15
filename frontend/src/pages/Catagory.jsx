import React from 'react';
import { NavSection } from "../Components/NavSection";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Import MUI Icons
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LocalPharmacyOutlinedIcon from '@mui/icons-material/LocalPharmacyOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const Card = (props) => {
  const IconComponent = props.icon;
  return (
    <StyledCardLink to={props.link}>
      {IconComponent && (
        <CardIconWrapper>
          <IconComponent sx={{ fontSize: '3rem', color: 'var(--primary-color)' }} />
        </CardIconWrapper>
      )}
      <CardHeader>{props.header}</CardHeader>
      <CardAbout>{props.about}</CardAbout>
    </StyledCardLink>
  );
};

const StyledCardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  padding: 25px;
  text-decoration: none;
  color: #333;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  min-height: 160px;
  flex: 1 1 calc(33.333% - 20px);
  box-sizing: border-box;
  text-align: center; /* Center content within the card */

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    flex: 1 1 calc(50% - 15px);
    min-height: 140px;
    padding: 20px;
  }

  @media (max-width: 767px) {
    flex: 1 1 100%;
    min-height: 120px;
    padding: 18px;
  }
`;

const CardIconWrapper = styled.div`
  margin-bottom: 15px;
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CardHeader = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 12px;

  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

const CardAbout = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-top: auto;

  @media (max-width: 767px) {
    font-size: 0.95rem;
  }
`;

Card.propTypes = {
  link: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export const Catagory = () => {
  const categories = [
    {
      link: "/user/screeningtest/Anxiety",
      header: "Anxiety",
      about: "Intense, persistent worry or fear about everyday situations",
      icon: SentimentDissatisfiedOutlinedIcon,
    },
    {
      link: "/user/screeningtest/Emotional Intelligence",
      header: "Emotional Intelligence",
      about: "Understanding and managing emotions effectively",
      icon: LightbulbOutlinedIcon,
    },
    {
      link: "/user/screeningtest/Addiction",
      header: "Addiction",
      about: "Compulsive dependence on substances or behaviors",
      icon: LocalPharmacyOutlinedIcon,
    },
    {
      link: "/user/screeningtest/Stress",
      header: "Stress",
      about: "Mental tension from demanding situations or challenges.",
      icon: CloudOutlinedIcon,
    },
    {
      link: "/user/screeningtest/Depression",
      header: "Depression",
      about: "Persistent sadness and loss of interest in activities",
      icon: SentimentVeryDissatisfiedOutlinedIcon,
    },
    {
      link: "/user/counsellor",
      header: "Others",
      about: "If you don't understand what the problem is, consult with our counselor",
      icon: SupportAgentOutlinedIcon,
    },
  ];

  return (
    <CatagoryContainer>
      <NavSection />
      <CatagorySection>
        {categories.map((category, index) => (
          <Card
            key={index}
            link={category.link}
            header={category.header}
            about={category.about}
            icon={category.icon}
          />
        ))}
      </CatagorySection>
    </CatagoryContainer>
  );
};

const CatagoryContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 60px;
  }
`;

const CatagorySection = styled.div`
  flex-grow: 1;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  align-content: center;
  justify-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 4rem;


  @media (max-width: 767px) {
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
`;
