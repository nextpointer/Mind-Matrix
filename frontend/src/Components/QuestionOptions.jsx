import styled from "styled-components";
import RadioGroup from "./RadioGroup";

export const QuestionOptions = () => {
  return (
    <>
      <Conatainer>
        <Question>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias beatae debitis nemo totam nihil tenetur nisi corrupti laudantium tempora ipsam.</p>
        </Question>
        <Options>
            <RadioGroup/>
        </Options>
      </Conatainer>
    </>
  );
};

const Conatainer = styled.div`
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
  &:hover{
    box-shadow: 0px 0px 20px 1px #ffbb763f;
    border: 1px solid rgba(255, 255, 255, 0.454);
  }
`;

const Question = styled.div`
  height: inherit;
  width: 65%;
  /* background-color: blueviolet; */
  padding: 20px;
  color: #ffffff;
  p{
    font-size: 1.1rem;
    font-weight: 200;
    letter-spacing: 0.01rem;
    
  }
`;

const Options = styled.div`
  height: inherit;
  width: 35%;
  /* background-color: #2be2ab; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
