import { NavSection } from "../Components/NavSection.jsx";
import NormalButtons from "../Components/NormalButton.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Chart from "../Components/Chart.jsx";
// import { useAuth } from "../authContext.jsx";
import Slider from "../Components/Slider.jsx";

// import bred from "/images/beard.svg";
import hero from "/images/mA.jpg";
import coun from "/images/image.png";

const photos = [hero,hero,hero];
const counphotes = [coun,coun]

export const Dashboard = () => {
  const navigate = useNavigate();
  const handleScreeningTest = (event) => {
    event.preventDefault();
    navigate("/user/screeningtest/catagory");
  };
  const handleSurvey = (event) => {
    event.preventDefault();
    navigate("/user/screeningtest/Daily");
  };


  // if (!resultData) {
  //   return <p>No result data found</p>;
  // }

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else if (hours < 22) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  return (
    <>
      <div id="dashboard-conatainer">
        <NavSection FirstName="john" LastName="Doe" />
        <div id="dashboard-test-stat-section">
          <div id="dashboard-greeting">
            <p>{getGreeting()} John</p>
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
            <Chart />
          </div>
          <div id="dashboard-motivationalQuote">
            <p>
              When I look at the world, I&apos;m pessimistic, but when I look at
              people I am optimistic.
            </p>
            <p>— Carl Rogers</p>
          </div>
        </div>
        <div id="dashboard-recommendation-section">
          <div id="dashboard-music">
            <Slider photos={photos} />
          </div>
          <div id="dashboard-video">
            <Slider photos={photos} />
          </div>

          <div id="dashboard-counsellor">
            <Slider photos={counphotes} />
          </div>
        </div>
      </div>
    </>
  );
};
