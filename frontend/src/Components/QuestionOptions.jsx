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
  height: 100px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.074);
  border: 1px solid rgba(255, 255, 255, 0.222);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0px 0px 20px 1px #8483833c;
    border: 1px solid rgba(96, 95, 95, 0.454);
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
`;

const Options = styled.div`
  height: inherit;
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
