import styled from "styled-components";
import PropTypes from "prop-types"; // Import PropTypes
import RadioGroup from "./RadioGroup";

export const QuestionOptions = ({ question, onAnswerChange }) => {
  return (
    <>
      <Container>
        <Question>
          <p>{question.questionName}</p>
        </Question>
        <Options>
          <RadioGroup questionId={question._id} onAnswerChange={onAnswerChange} />
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
    box-shadow: 0px 0px 20px 1px #ffbb763f;
    border: 1px solid rgba(255, 255, 255, 0.454);
  }
`;

const Question = styled.div`
  height: inherit;
  width: 65%;
  padding: 20px;
  color: #ffffff;
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
