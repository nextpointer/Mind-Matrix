import '../styles//ComponentStyle/Navbar.css'
import { Nav } from './Nav'
import PropTypes from 'prop-types'

export const NavSection = ({FirstName,LastName}) => {
  return (
    <>
        <div id="dashboard-profile-navbar-section">
                <div id="dashboard-logo">
                    <p>Logos</p>
                </div>
                <div id="dashboard-profile-section">
                    <div className="outline-profile-pic">
                        <div className="inline-profile-pic"> 
                            <img src="/images/beard.svg" alt="" /> 
                        </div>
                    </div>
                    <p className='profile-name'>{FirstName} {LastName}</p>
                    <p className='profile-type'>Student</p>
                </div>
                <div id="dashboard-navbar-section">
                    <Nav label='Home' icon='/Icons/home.svg' value={true} link='/user/dashboard'/>
                    <Nav label='Music' icon='/Icons/music.svg' value={true}  link='/user/music'/>
                    <Nav label='Meditation' icon='/Icons/meditation.svg' value={true}  link='/user/meditation'/>
                    <Nav label='AI' icon='/Icons/AI.svg' value={true} link='/user/ai'/>
                    <Nav label='Counsellor' icon='/Icons/doctor.svg' value={true}  link='/user/counsellor'/>
                    <Nav label='Videos' icon='/Icons/videos.svg' value={true} link='/user/video'/>
                    <Nav label='About' icon='/Icons/about.svg' value={true}  link='/about'/>
                    
                    
                </div>
                <div id="dashboard-logout-section">
                <Nav label='Logout' icon='/Icons/logout.svg' value={false} link='/logout'/>
                </div>
            </div>
    </>
  )
}
NavSection.propTypes = {
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,

  };
