import { NavSection } from "../Components/NavSection.jsx";
import NormalButtons from "../Components/NormalButton.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Chart from "../Components/Chart.jsx";
// import { useAuth } from "../authContext.jsx";
import Slider from "../Components/Slider.jsx";
import Alert from "../Components/Alert.jsx";
import { useAuth } from "../lib/userContext.jsx";

//import icons
import InfoIcon from "@mui/icons-material/Info";
// import tooltip
import { Tooltip } from "@mui/material";

// import bred from "/images/beard.svg";
import hero from "/images/mA.jpg";
import coun1 from "/images/image.png";
import coun2 from "/images/councelor2.png";
import coun3 from "/images/counselor3.png";
// import pic for meditation

import Brain from "/Icons/brain.svg";
import Daily from "/Icons/daily.svg";

import m1 from "/images/a1.jpg";
import m2 from "/images/a3.jpg";
import m3 from "/images/medi.svg";

// import image for videos
import yt1 from "/images/yt1.png";
import yt2 from "/images/yt2.png";
import yt3 from "/images/yt3.png";
import { useAlert } from "../Store/useAlert.js";
import { useEffect } from "react";

const ytphotos = [yt1, yt2, yt3];
const counphotes = [coun1, coun2, coun3];
const mediphotes = [m1, m2, m3];

export const Dashboard = () => {
  const { alert, setAlert } = useAlert();
  useEffect(() => {
    if (alert.visible) {
      setAlert({ ...alert, visible: false });
    }
  }, [setAlert]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleScreeningTest = (event) => {
    event.preventDefault();
    navigate("/user/screeningtest/catagory");
  };
  const handleSurvey = (event) => {
    event.preventDefault();
    navigate("/user/screeningtest/Daily");
  };

  console.log(alert);

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
      {/* Display alert if visible */}
      {alert.visible && (
        <Alert type={alert.type} string={alert.message} duration={3000} />
      )}
      <div id="dashboard-conatainer">
        <NavSection />
        <div id="dashboard-test-stat-section">
          <div id="dashboard-greeting">
            <p>
              {getGreeting()} {currentUser.FirstName}
            </p>
          </div>
          <div id="dashboard-test">
            <div id="dashboard-screening-test">
              <div className="test-flex">
                <h2>Screening Test</h2>
                <Tooltip
                  title="Screening testing in mental health helps identify potential
                issues early, facilitating timely intervention and treatment"
                >
                  <InfoIcon />
                </Tooltip>
              </div>
              <form onSubmit={handleScreeningTest} className="screenform">
                <NormalButtons text="Take Test" type="submit" />
              </form>
              <img src={Brain} alt="brain" className="test-svg" />
            </div>
            <div id="dashboard-daily-test">
              <div className="test-flex">
                <h2>Daily Survey</h2>
                <Tooltip
                  title="Daily surveys in mental health patients monitor symptoms and
                progress, aiding in personalized and effective care"
                >
                  <InfoIcon />
                </Tooltip>

              </div>
              <form onSubmit={handleSurvey} className="screenform">
                <NormalButtons text="Take Survey" type="submit" />
              </form>
              <img src={Daily} alt="daily" className="test-svg" />
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
            <Slider photos={mediphotes} />
          </div>
          <div id="dashboard-video">
            <Slider photos={ytphotos} />
          </div>

          <div id="dashboard-counsellor">
            <Slider photos={counphotes} />
          </div>
        </div>
      </div>
    </>
  );
};
