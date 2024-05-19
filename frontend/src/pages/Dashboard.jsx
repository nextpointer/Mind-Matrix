import { NavSection } from '../Components/NavSection.jsx';
import '../styles/dashboard.css';

export const Dashboard = () => {
  return (
    <>
        <div id="dashboard-conatainer">
            <NavSection/>
            <div id="dashboard-test-stat-section">
                <div id="dashboard-greeting">
                    
                </div>
                <div id="dashboard-test">
                    <div id="dashboard-screening-test">

                    </div>
                    <div id="dashboard-daily-test">

                    </div>
                </div>
                <div id="dashboard-stat">

                </div>
                <div id="dashboard-motivationalQuote">

                </div>
                
            </div>
            <div id="dashboard-recommendation-section">
                <div id="dashboard-music">
                    
                </div>
                <div id="dashboard-video">
                    
                </div>
                <div id="dashboard-counsellor">
                    
                </div>
            </div>
        </div>
    </>
  )
}
