import { NavSection } from "../Components/NavSection.jsx";
import NormalButtons from "../Components/NormalButton.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Chart from "../Components/Chart.jsx";

export const Dashboard = () => {
  const navigate = useNavigate();
  const handleScreeningTest = (event) => {
    event.preventDefault();
    navigate("/user/screeningtest/catagory");
  };
  const handleSurvey = (event) => {
    event.preventDefault();
    navigate("/user/screeningtest/Emotional Intelligence");
  };
  return (
    <>
      <div id="dashboard-conatainer">
        <NavSection />
        <div id="dashboard-test-stat-section">
          <div id="dashboard-greeting">
            <p>Good Afternoon John</p>
          </div>
          <div id="dashboard-test">
            <div id="dashboard-screening-test">
              <p>Screening Test</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet.
              </p>
              <form onSubmit={handleScreeningTest} className="screenform">
                <NormalButtons text="Take Test" type="submit" />
              </form>
            </div>
            <div id="dashboard-daily-test">
              <p>Daily Survey</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet.
              </p>
              <form onSubmit={handleSurvey} className="screenform">
                <NormalButtons text="Take Survey" type="submit" />
              </form>
            </div>
          </div>
          <div id="dashboard-stat">
            <Chart/>
          </div>
          <div id="dashboard-motivationalQuote">
            <p>When I look at the world, I&apos;m pessimistic, but when I look at people I am optimistic.</p>
            <p>— Carl Rogers</p>
          </div>
        </div>
        <div id="dashboard-recommendation-section">
          <div id="dashboard-music"></div>
          <div id="dashboard-video"></div>
          <div id="dashboard-counsellor"></div>
        </div>
      </div>
    </>
  );
};
