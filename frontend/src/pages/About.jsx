import React from "react";
import styled from "styled-components";
import { NavSection } from "../Components/NavSection";

// Custom SVG Icons (simplified for lightness)
const MindIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v.2c-2.3.4-4 2.5-4 4.8V21h14v-9c0-2.3-1.7-4.4-4-4.8V5a3 3 0 0 0-3-3zM7 17v-7M17 17v-7M12 17v-7" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommunityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="8" y1="8" x2="8" y2="12" />
    <line x1="16" y1="8" x2="16" y2="12" />
  </svg>
);

const VerifiedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const primaryColor = "#A1EEBD";
const textColor = "#1f2937";
const secondaryTextColor = "#555";
const cardBackgroundColor = "#ffffff";
const pageBackgroundColor = "#f0f2f5";

export default function AboutPage () {
  const features = [
    {
      icon: <MindIcon />,
      title: "AI-Powered Support",
      description:
        "Our advanced AI helps you understand your mental state and provides personalized recommendations.",
    },
    {
      icon: <HeartIcon />,
      title: "Compassionate Care",
      description:
        "Designed with empathy at its core to provide gentle, understanding support when you need it most.",
    },
    {
      icon: <CommunityIcon />,
      title: "Mental Health Tracking",
      description:
        "Monitor your well-being with our daily assessments. Track your emotions and gain insights into your mental health journey.",
    },
    {
      icon: <VerifiedIcon />,
      title: "Professional Guidance",
      description:
        "All content is vetted by licensed mental health professionals to ensure quality and safety.",
    },
  ];

  return (
    <AboutPageContainer>
      <NavSection />
      <MainContentArea>
        <ContentWrapper>

          <MissionCard>
            <MissionTitle>Our Mission</MissionTitle>
            <MissionDescription>
              To democratize mental health support by providing free,
              accessible tools that help people understand and improve their
              emotional wellbeing. We believe everyone deserves
              compassionate care regardless of their circumstances.
            </MissionDescription>
            <StyledDivider />
            <NumbersTitle>The Numbers</NumbersTitle>
            <NumbersGrid>
              <NumberItem>
                <NumberValue>100+</NumberValue>
                <NumberLabel>Users</NumberLabel>
              </NumberItem>
              <NumberItem>
                <NumberValue>10+</NumberValue>
                <NumberLabel>Professionals (Dummy)</NumberLabel>
              </NumberItem>
              <NumberItem>
                <NumberValue>10+</NumberValue>
                <NumberLabel>Meditations</NumberLabel>
              </NumberItem>
              <NumberItem>
                <NumberValue>24/7</NumberValue>
                <NumberLabel>Support</NumberLabel>
              </NumberItem>
            </NumbersGrid>
          </MissionCard>

          <FeaturesSection>
            <FeaturesTitle>Why Choose Mind Matrix</FeaturesTitle>
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIconWrapper>{feature.icon}</FeatureIconWrapper>
                  <FeatureCardTitle>{feature.title}</FeatureCardTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </FeaturesSection>
        </ContentWrapper>
      </MainContentArea>
    </AboutPageContainer>
  );
};

const AboutPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${pageBackgroundColor};
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 60px;
  }
`;

const MainContentArea = styled.div`
  flex-grow: 1;
  background-color: ${pageBackgroundColor};
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 767px) {
    padding: 15px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BaseCard = styled.div`
  background-color: ${cardBackgroundColor};
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 767px) {
    padding: 20px;
  }
`;


const MissionCard = styled(BaseCard)`
  text-align: left;
`;

const MissionTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${textColor};

  @media (max-width: 767px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
`;

const MissionDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 25px;
  line-height: 1.7;
  color: ${secondaryTextColor};

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const StyledDivider = styled.hr`
  border: none;
  border-top: 2px solid ${primaryColor};
  margin: 30px auto; /* Center the divider */
  width: 50%;
  opacity: 0.7; /* Softer divider */
`;

const NumbersTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${textColor};
  text-align: center;

  @media (max-width: 767px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 25px;
  text-align: center;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const NumberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${pageBackgroundColor};
  padding: 20px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NumberValue = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: ${primaryColor};
  margin-bottom: 8px;

  @media (max-width: 767px) {
    font-size: 2.5rem;
  }
`;

const NumberLabel = styled.p`
  font-size: 1rem;
  color: ${secondaryTextColor};
  margin: 0;

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const FeaturesSection = styled.div`
  text-align: center;
`;

const FeaturesTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${textColor};

  @media (max-width: 767px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeatureCard = styled(BaseCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 30px;
  border: 1px solid #e0e0e0; /* Subtle border */

  @media (max-width: 767px) {
    padding: 25px;
  }
`;

const FeatureIconWrapper = styled.div`
  background-color: ${primaryColor};
  color: ${textColor};
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  svg {
    font-size: 3rem;
  }
`;

const FeatureCardTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${textColor};

  @media (max-width: 767px) {
    font-size: 1.3rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${secondaryTextColor};
  flex-grow: 1;
`;
