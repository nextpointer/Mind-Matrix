import "../styles/Home.css"
import { Button } from "../Components/Button"
import { MainHeading } from "../Components/MainHeading"
import { SubHeading } from "../Components/SubHeading"
import { Link } from "react-router-dom"
import NormalButtons from "../Components/NormalButton"

export const Home = () => {
  return (
    <>
        <div id="homepage-logo-login-bar">
            <div className="homepage-logo-section">
                <p>MIND MATRIX</p>
            </div>
            <div className="homepage-login-section">
                <span>Already a User</span><Link to={"/user/login"}><NormalButtons text="Login" /></Link>
            </div>
        </div>
        <div id="homepage-hero-section">
          <div className="hero-header">
            <div className="hero-header-mainHedader">
            <MainHeading text="Feeling Stressed, Anxious, or Worried?"/>
            </div>
            <div className="hero-header-subHedader">
              <SubHeading text="You're not alone. Take control of your mental health with Mind Matrix"/>
            </div>
            <div className="hero-getting-start">
              <Link to={'/user/login'} className="linkdashboard"><Button/></Link>
            </div>
          </div>
        </div>
    </>
  )
}


