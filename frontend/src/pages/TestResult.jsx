import { NavSection } from '../Components/NavSection'
import Progressbar from '../Components/Progressbar'
import '../styles/TestResult.css'

export const TestResult = () => {
  return (
    <>
      <div id="testresult-container">
        <NavSection/>
        <div id="testresult-section">
            <div id="result">
                <div className="progress">
                <Progressbar/>
                </div>
                <div className="result-data">
                   <p>Your axiety level is very High</p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
