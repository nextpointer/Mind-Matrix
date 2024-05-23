import { NavSection } from "../Components/NavSection";
import NormalButtons from "../Components/NormalButton";
import { QuestionOptions } from "../Components/QuestionOptions";
import "../styles/screeningtest.css";
export const ScreeningTest = () => {
  return (
    <>
      <div id="test-container">
        <NavSection />
        <div id="test-section">
          <div className="testHeader">
            <p>Anxiety Test</p>
          </div>
          <div className="testAbout">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              sequi quos, ipsam voluptas officiis deserunt quasi consectetur
              aperiam repudiandae dolores sit molestiae expedita! Temporibus
              dolorem soluta quam minus, iure optio!
            </p>
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
          <div className="QuestionList">
            <QuestionOptions/>
            <QuestionOptions/>
            <QuestionOptions/>
            <QuestionOptions/>
            <QuestionOptions/>
            <QuestionOptions/>
            <QuestionOptions/>
            <NormalButtons text="Submit Answers"/>
          </div>
        </div>
      </div>
    </>
  );
};
