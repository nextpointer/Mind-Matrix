import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavSection } from "../Components/NavSection";
import NormalButtons from "../Components/NormalButton";
import Loader from "../Components/Loader";
import { QuestionOptions } from "../Components/QuestionOptions";
import "../styles/screeningtest.css";
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
        const response = await api.get(
          `/questions/test/${testtype}`
        );
        const data = response.data.data; // Access the data property directly
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
    return <p>{error}</p>;
  }

  return (
    <>
      <div id="test-container">
        <NavSection />
        <div id="test-section">
          <div className="testHeader">
            <p>{testCategory} Test</p>
          </div>
          <div className="testAbout">
            <p>{testAbout}</p>
          </div>
          <div className="howto">
            <div className="about">
              <p>
                Using the key below, answer the questions based on how strongly
                you agree or disagree with the statement
              </p>
            </div>
            <div className="optionDetails">
              <p>Disagree</p>
              <p>Neutral</p>
              <p>Agree</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="testForm">
            <div className="QuestionList">
              {questions.map((question) => (
                <QuestionOptions
                  key={question._id}
                  question={question}
                  onAnswerChange={handleAnswerChange}
                  answers={answers}
                />
              ))}
            </div>
            <NormalButtons text="Submit Answers" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};
