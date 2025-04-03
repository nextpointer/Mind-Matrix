import "../styles//ComponentStyle/Navbar.css";
import { Nav } from "./Nav";
import { useAuthStore } from "../Store/authStore";
import { useRef, useState } from "react";
import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';



export const NavSection = () => {
  const { currentUser } = useAuthStore() || {};
  const navRef = useRef();
  const [visible,setVisible]  = useState(true);
  const navHide = () => {
    navRef.current.classList.toggle("hide");
    setVisible(!visible);
  };
  return (
    <>
      <div className="dashboard-profile-navbar-section" ref={navRef}>
        <div id="dashboard-logo">
          <p>MINDMATRIX</p>
        </div>
        <div id="dashboard-profile-section">
          <div className="outline-profile-pic">
          <Avatar  sx={{ width:"100%",height:"100%",bgcolor:"var(--primary-color)",color:"black",fontSize:"1.8rem",fontWeight:"normal"}}>{currentUser.FirstName.at(0)}</Avatar>
          </div>
          <p className="profile-name">
            {currentUser.FirstName} {currentUser.LastName}
          </p>
          <p className="profile-type">Student</p>
        </div>
        <div id="dashboard-navbar-section">
          <Nav
            label="Home"
            icon="/Icons/home.svg"
            value={true}
            link="/user/dashboard"
          />
          <Nav
            label="Meditation"
            icon="/Icons/meditation.svg"
            value={true}
            link="/user/meditation"
          />
          <Nav label="AI" icon="/Icons/AI.svg" value={true} link="/user/ai" />
          <Nav
            label="Counsellor"
            icon="/Icons/doctor.svg"
            value={true}
            link="/user/counsellor"
          />
          <Nav
            label="Videos"
            icon="/Icons/videos.svg"
            value={true}
            link="/user/video"
          />
          <Nav
            label="About"
            icon="/Icons/about.svg"
            value={true}
            link="/about"
          />
        </div>
        <div id="dashboard-logout-section">
          <Nav
            label="Logout"
            icon="/Icons/logout.svg"
            value={false}
            link="/logout"
          />
        </div>
      </div>
      <button className="hide-and-seek" onClick={navHide}>
        {visible?<KeyboardDoubleArrowLeftTwoToneIcon/>:<KeyboardDoubleArrowRightTwoToneIcon/>}
      </button>
    </>
  );
};
