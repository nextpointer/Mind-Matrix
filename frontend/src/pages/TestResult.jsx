import React from 'react';
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { NavSection } from '../Components/NavSection';
import Progressbar from '../Components/Progressbar';

export const TestResult = () => {
  const location = useLocation();
  const resultData = location.state?.resultData;

  const recommendedTests = [
    {
      label: "Stress Test",
      link: "/user/screeningtest/Stress",
    },
    {
      label: "Depression Test",
      link: "/user/screeningtest/Depression",
    },
    {
      label: "Emotional Intelligence",
      link: "/user/screeningtest/Emotional Intelligence",
    },
  ];

  if (!resultData) {
    return <NoDataMessage>No result data found. Please take a test first.</NoDataMessage>;
  }

  return (
    <TestResultContainer>
      <NavSection />
      <TestResultSection>
        <ResultCard>
          <ProgressBarWrapper>
            <Progressbar percentage={resultData.points} />
          </ProgressBarWrapper>
          <ResultContent>
            <ResultLevel>{resultData.responseLevelData[0]}</ResultLevel>
            <ResultDescription>{resultData.responseLevelData[1]}</ResultDescription>
          </ResultContent>
        </ResultCard>

        <RecommendationSection>
          <RecommendationHeader>Recommended Tests</RecommendationHeader>
          <RecommendationButtonGrid>
            {recommendedTests.map((test, index) => (
              <StyledRecommendationButton key={index} to={test.link}>
                {test.label}
              </StyledRecommendationButton>
            ))}
          </RecommendationButtonGrid>
        </RecommendationSection>
      </TestResultSection>
    </TestResultContainer>
  );
};

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #ef4444;
  margin-top: 50px;
  width: 100%;
`;

const TestResultContainer = styled.div`
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

const TestResultSection = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: scroll;
  height: 100vh; 
  justify-content: center;


  @media (max-width: 767px) {
    padding: 15px;
  }
`;

const ResultCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 20px;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  max-width: 250px;
  margin-bottom: 30px;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-content: center;

  @media (max-width: 767px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResultLevel = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000; 
  margin: 0;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const ResultDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const RecommendationSection = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 20px;
  }
`;

const RecommendationHeader = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 25px;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const RecommendationButtonGrid = styled.div`
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 15px;
  width: 100%;
  align-items: center; /* Center buttons horizontally */

  @media (min-width: 600px) { /* Adjust for wider screens to show buttons side-by-side */
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StyledRecommendationButton = styled(Link)`
  display: inline-block;
  background-color: #000000;
  color: white;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none; 
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: auto;
  min-width: 180px;

  &:hover {
    background-color: var(--primary-color); 
    transform: translateY(-2px); 
    color: black;
  }

  &:active {
    background-color:  var(--primary-color); 
    transform: translateY(0);
    color: black;
  }

  @media (max-width: 767px) {
    width: 90%; 
    padding: 10px 20px;
    font-size: 1rem;
  }
`;
