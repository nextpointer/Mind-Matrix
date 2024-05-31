import { NavSection } from '../Components/NavSection'
import { useLocation } from "react-router-dom";
import Progressbar from '../Components/Progressbar'
import '../styles/TestResult.css'


export const TestResult = () => {
  const location = useLocation();
  const resultData = location.state?.resultData;
  
  if (!resultData) {
    return <p>No result data found</p>;
  }

  return (
    <>
       <div id="testresult-container">
        <NavSection/>
        <div id="testresult-section">
            <div id="result">
                <div className="progress">
                <Progressbar percentage={resultData.points}/>
                </div>
                <div className="result-data">
                   <p>{resultData.responseLevelData[0]}</p>
                   <p>{resultData.responseLevelData[1]}</p>
                </div>
            </div>
        </div>
      </div> 
    </>
  )
}
