import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavSection } from "../Components/NavSection";
import Loader from "../Components/Loader";
import { QuestionOptions } from "../Components/QuestionOptions";
import { api } from "../lib/axios.config";

export const ScreeningTest = () => {
  const { testtype } = useParams();
  const [testCategory, setTestCategory] = useState("");
  const [testAbout, setTestAbout] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get(`/questions/test/${testtype}`);
        const data = response.data.data;
        if (data && data.Questions) {
          setTestCategory(data.TestCategory);
          setTestAbout(data.About);
          setQuestions(data.Questions);
        } else {
          setError("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testtype]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all questions have been answered
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const theAns = JSON.stringify(answers);
    api
      .post(`/result/${testtype}`, { theAns })
      .then((response) => {
        navigate("/user/screeningtest/result/Anxiety", {
          state: { resultData: response.data.data },
        });
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
      });
  };

  if (loading) {
    return <Loader bg={"#fff"} barcolor={"#A1EEBD"} />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <TestContainer>
      <NavSection />
      <TestSection>
        <TestHeader>
          <p>{testCategory} Test</p>
        </TestHeader>
        <TestAbout>
          <p>{testAbout}</p>
        </TestAbout>
        <HowToSection>
          <AboutText>
            <p>
              Using the key below, answer the questions based on how strongly
              you agree or disagree with the statement
            </p>
          </AboutText>
          <OptionDetails>
            <p>Disagree</p>
            <p>Neutral</p>
            <p>Agree</p>
          </OptionDetails>
        </HowToSection>
        <TestForm onSubmit={handleSubmit}>
          <QuestionList>
            {questions.map((question) => (
              <QuestionOptions
                key={question._id}
                question={question}
                onAnswerChange={handleAnswerChange}
                answers={answers}
              />
            ))}
          </QuestionList>
          <SubmitButtonWrapper>
            <StyledSubmitButton type="submit" disabled={!allQuestionsAnswered}>
              Submit Answers
            </StyledSubmitButton>
          </SubmitButtonWrapper>
        </TestForm>
      </TestSection>
    </TestContainer>
  );
};

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 1.2rem;
  margin-top: 50px;
`;

const TestContainer = styled.div`
  display: flex;
  min-height: 100vh;
  /* background-color: #f0f2f5; */
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 60px;
  }
`;

const TestSection = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: auto;
  width: 100%;
  /* background-color: red; */


  @media (max-width: 767px) {
    padding: 15px;
  }
`;

const TestHeader = styled.div`
  width: 95%;
  background-color: #ffffff;
  color: #000000;
  /* padding: 10px; */
  border-radius: 12px;
  /* margin-bottom: 20px; */
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
  text-align: left;
  box-sizing: border-box;

  p {
    font-size: 3.5rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    margin: 0;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 15px;
    padding-bottom: 10px;
    p {
      font-size: 2rem;
      line-height:2.3rem;
    }
  }
`;

const TestAbout = styled.div`
  width: 95%;
  /* background-color: #e0f2f7; */
  color: #333;
  border-radius: 12px;
  margin-bottom: 20px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); */
  text-align: left;
  box-sizing: border-box;

  p {
    font-size: 1.1rem;
    line-height: 1.5;
    margin: 0;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    p {
      font-size: 1rem;
    }
  }
`;

const HowToSection = styled.div`
  width: 95%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 15px;
  }
`;

const AboutText = styled.div`
  flex: 2;
  p {
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
    margin: 0;
  }

  @media (max-width: 767px) {
    p {
      font-size: 0.95rem;
      text-align: center;
    }
  }
`;

const OptionDetails = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;

  p {
    font-size: 0.9rem;
    font-weight: 600;
    color: #3b82f6;
    margin: 0;
    text-align: center;
  }

  @media (max-width: 767px) {
    margin-top: 10px;
    p {
      font-size: 0.85rem;
    }
  }
`;

const TestForm = styled.form`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 60vh;
  overflow-y: scroll;
  border-bottom: 1px solid black;
  /* background-color: red; */

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const QuestionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const SubmitButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const StyledSubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 100;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--primary-color);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }

  @media (max-width: 767px) {
    width: 80%;
    padding: 10px 20px;
    font-size: 1rem;
  }
`;
