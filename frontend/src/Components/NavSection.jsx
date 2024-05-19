import '../styles//ComponentStyle/Navbar.css'
import { Nav } from './Nav'

export const NavSection = () => {
  return (
    <>
        <div id="dashboard-profile-navbar-section">
                <div id="dashboard-logo">
                    <p>Logos</p>
                </div>
                <div id="dashboard-profile-section">
                    <div className="outline-profile-pic">
                        <div className="inline-profile-pic">  
                        </div>
                    </div>
                    <p className='profile-name'>John Doe</p>
                    <p className='profile-type'>Student</p>
                </div>
                <div id="dashboard-navbar-section">
                    <Nav label='Home' icon='/Icons/home.svg' value={true}/>
                    <Nav label='Music' icon='/Icons/music.svg' value={true}/>
                    <Nav label='Meditation' icon='/Icons/meditation.svg' value={true}/>
                    <Nav label='AI' icon='/Icons/AI.svg' value={true}/>
                    <Nav label='Counsellor' icon='/Icons/doctor.svg' value={true}/>
                    <Nav label='Videos' icon='/Icons/videos.svg' value={true}/>
                    <Nav label='About' icon='/Icons/about.svg' value={true}/>
                    
                    
                </div>
                <div id="dashboard-logout-section">
                <Nav label='Logout' icon='/Icons/logout.svg' value={false}/>
                </div>
            </div>
    </>
  )
}
