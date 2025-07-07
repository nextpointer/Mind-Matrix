import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import styled from "styled-components";

// Material UI Icons
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChatIcon from '@mui/icons-material/Chat';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledButton = styled.button`
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.25rem;
  background: var(--primary-color);
  color: #000000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  letter-spacing: 0.5px;
`;

const StyledNormalButton = styled.button`
  padding: 10px 25px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 200;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  background-color: #000000; 
  color: white;

  &:hover {
    background-color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--primary-color);
  }
`;

// --- Styled Components for Home Page ---

const HomepageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
  background: linear-gradient(180deg, #FFF0 0%, #FFFF 100%) 0 0 / 130dvw 130dvh,
    conic-gradient(from 90deg at 1px 1px, #8880 90deg, #e2e1e1 0) center -1px / 50px 50px;
  color: #000000;
`;


const HomepageLogoLoginBar = styled.div`
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 15px;
    /* background-color: red; */
  }
`;

const HomepageLogoSection = styled.div`
  .logo-link p {
    font-size: 1rem;
    color: #000000; 
    text-decoration: none;
    margin: 0;
    letter-spacing: 2px;
    transition: color 0.3s ease;
    /* background-color: green; */
    text-align: center;
  }
`;

const HomepageLoginSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  /* background-color: blue; */

  .already-user {
    font-size: 0.8rem;
    color: #505050; 
  }

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
    width: 100%;
    justify-content: end;
  }
`;

const HomepageHeroSection = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  max-width: 1000px;
  z-index: 5;
`;

const HeroHeader = styled.h1`
  font-size: 4rem;
  color: #000000;
  margin-bottom: 20px;
  line-height: 1.2;
    font-weight: 400;

  span {
    display: inline-block;
  }

  @media (max-width: 1024px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubheader = styled.h2`
  font-size: 1.4rem;
  color: #1f1f1f;
  margin-bottom: 20px;
  line-height: 1.6;
  font-weight: 200;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const LinkDashboard = styled(Link)`
  margin-bottom: 10px;
`;

const HomeFeatures = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 80px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

const HomeCard = styled.div`
  background-color: #282828; /* Card background */
  border: 1px solid #444444; /* Card border */
  border-radius: 20px;
  padding: 35px;
  width: 280px;
  min-height: 220px;
  text-align: center;
  box-shadow: 0 12px 30px rgba(89, 89, 89, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* Radial gradient for mousemove effect */
  background-image: radial-gradient(
    circle at var(--x) var(--y),
    rgba(255, 255, 255, 0.08) 0%, 
    transparent 50% 
  );

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px var(--primary-color); 
  }

  @media (max-width: 1024px) {
    width: 260px;
    padding: 30px;
  }
  @media (max-width: 768px) {
    width: 90%;
    max-width: 320px;
  }
`;

const CardIcon = styled.div` 
  .MuiSvgIcon-root { 
    font-size: 4.5rem;
    color: var(--primary-color); 
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    .MuiSvgIcon-root {
      font-size: 3.5rem;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #e0e0e0;
  font-weight: 400;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #a0a0a0;
`;

export const Home = () => {
  const cardsRef = useRef([]);
  const headerRef = useRef([]);
  const svgRefs = useRef([]);

  // Data for the feature cards with Material UI Icon components
  const features = [
    {
      title: "Mental Wellness Screenings",
      description: "Quick and confidential assessments to understand your state of mind.",
      icon: PsychologyIcon // Directly use the imported MUI component
    },
    {
      title: "AI Chatbot Support",
      description: "Get instant, empathetic responses and coping strategies 24/7.",
      icon: ChatIcon // Directly use the imported MUI component
    },
    {
      title: "Daily Mood Tracking",
      description: "Monitor your emotional well-being and identify patterns over time.",
      icon: SentimentVerySatisfiedIcon // Directly use the imported MUI component
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e, card) => {
      const x = e.pageX - card.offsetLeft;
      const y = e.pageY - card.offsetTop;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    };

    const addMouseMoveListeners = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
        }
      });
    };

    const removeMouseMoveListeners = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mousemove", (e) =>
            handleMouseMove(e, card)
          );
        }
      });
    };

    addMouseMoveListeners();

    return () => {
      removeMouseMoveListeners();
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    // Animate hero header (letter by letter)
    tl.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.03 },
      "<0.3"
    );

    // Animate subheader
    tl.fromTo(
      ".hero-subheader", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    // Animate buttons
    tl.fromTo(
      ".linkdashboard", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    // Animate home-cards
    tl.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
      },
      "-=0.2"
    );
  }, []);

  return (
    <HomepageContainer>
      <HomepageLogoLoginBar>
        <HomepageLogoSection>
          <Link to={"/"} className="logo-link">
            <p>MIND MATRIX</p>
          </Link>
        </HomepageLogoSection>
        <HomepageLoginSection>
          <span className="already-user">Already a User</span>
          <Link to={"/user/login"}>
            <StyledNormalButton>Login</StyledNormalButton>
          </Link>
        </HomepageLoginSection>
      </HomepageLogoLoginBar>

      <HomepageHeroSection>
        <HeroHeader className="hero-header"> 
          {"Feeling space Stressed, space Anxious, space or space Worried?".split(" ").map(
            (char, index) => (
              <span
                key={index}
                ref={(el) => (headerRef.current[index] = el)}
                style={{ display: "inline-block" }}
              >
                {char === "space" ? "\u00A0" : char}
              </span>
            )
          )}
        </HeroHeader>
        <HeroSubheader className="hero-subheader"> 
          You're not alone. Take control of your mental health with Mind Matrix
        </HeroSubheader>
        <LinkDashboard to={"/user/register"} className="linkdashboard"> 
          <StyledButton>Get Started</StyledButton>
        </LinkDashboard>
        <HomeFeatures>
          {features.map((feature, index) => {
            const IconComponent = feature.icon; 
            return (
              <HomeCard
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <CardIcon>
                  <IconComponent /> 
                </CardIcon>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </HomeCard>
            );
          })}
        </HomeFeatures>
      </HomepageHeroSection>
    </HomepageContainer>
  );
};