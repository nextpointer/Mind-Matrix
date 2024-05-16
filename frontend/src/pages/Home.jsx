import "../styles/Home.css"
import { Button } from "../Components/Button"
import { MainHeading } from "../Components/MainHeading"
import { SubHeading } from "../Components/SubHeading"

export const Home = () => {
  return (
    <>
        <div id="homepage-logo-login-bar">
            <div className="homepage-logo-section">
                Logo
            </div>
            <div className="homepage-login-section">
                <Button >Alraedy a User?</Button>
            </div>
        </div>
        <div id="homepage-hero-section">
          <div className="hero-header">
            <div className="hero-header-mainHedader">
            <MainHeading text="Feeling Stressed, Anxious, or Worried?"/>
            </div>
            <div className="hero-header-subHedader">
              <SubHeading text="You're not alone. Take control of your mental health with SAP Management"/>
            </div>
            <div className="hero-getting-start">
              <Button/>
            </div>
          </div>
          <div className="hero-illustration">
              <img src="/images/hero.png" alt="gfggfg" />
          </div>
        </div>
    </>
  )
}


