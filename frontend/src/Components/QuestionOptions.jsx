import styled from "styled-components";
import PropTypes from "prop-types";
import RadioGroup from "./RadioGroup";

export const QuestionOptions = ({ question, onAnswerChange,answers }) => {
  return (
    <>
      <Container>
        <Question>
          <p>{question.questionName}</p>
        </Question>
        <Options>
          <RadioGroup
            value={question._id in answers ? answers[question._id] : ""}
            onChange={(value) => onAnswerChange(question._id, value)}
          />
        </Options>
      </Container>
    </>
  );
};

// Define prop types for the component
QuestionOptions.propTypes = {
  question: PropTypes.shape({
    questionName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
};

const Container = styled.div`
  height: auto; /* Adjust height for content-based sizing on small screens */
  width: 100%;
  margin-top: 16px;
  background-color: var(--primary-color);
  border: 1px solid rgba(255, 255, 255, 0.222);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row; /* Default layout */

  &:hover {
    box-shadow: 0px 0px 20px 1px #8483833c;
    border: 1px solid rgba(96, 95, 95, 0.454);
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack question and options vertically */
    padding: 10px; /* Add padding for spacing */
  }
`;

const Question = styled.div`
  height: inherit;
  width: 65%;
  padding: 20px;
  color: #000000;
  display: flex;
  align-items: center;
  
  p {
    font-size: 1.1rem;
    font-weight: 200;
    letter-spacing: 0.01rem;
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width for smaller screens */
    padding: 10px;
    text-align: center; /* Center-align text on smaller screens */
  }
`;

const Options = styled.div`
  height: inherit;
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%; /* Full width for smaller screens */
    margin-top: 10px; /* Add spacing between question and options */
  }
`;
