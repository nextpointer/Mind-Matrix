import React, { useEffect, useRef } from "react";
import "../styles/Home.css";
import { Button } from "../Components/Button";
import { Link } from "react-router-dom";
import NormalButtons from "../Components/NormalButton";
import gsap from "gsap";

export const Home = () => {
  const cardsRef = useRef([]);
  const headerRef = useRef([]);
  const svgRefs = useRef([]);

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
    const tl = gsap.timeline();
  
    // Animate SVGs (down to up)
    tl.fromTo(
      svgRefs.current,
      { y: 500, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power1.out", stagger: 0.2 }
    );
  
    // Animate hero header (letter by letter)
    headerRef.current.forEach((span, i) => {
      tl.fromTo(
        span,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power1.out" },
        `-=${0.4 - i * 0.02}` 
      );
    });
  
    // Animate subheader
    tl.fromTo(
      ".hero-subheader",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
    );
  
    // Animate home-cards
    tl.fromTo(
      cardsRef.current,
      { opacity: 0,},
      {
        opacity: 1,
        stagger: 0, // Stagger animation for each box
      }
    );
  
    // Animate buttons
    tl.fromTo(
      ".linkdashboard",
      { opacity: 0 },
      { opacity: 1,duration: 0.5 },
      "-=0.4" // Overlap with the previous animation
    );
  }, []);
  
  

  return (
    <>
      <main id="homepage-container">
        <img
          src="/images/leftbar.svg"
          alt="Decorative left bar"
          className="left-svg svg-block"
          ref={(el) => (svgRefs.current[0] = el)}
        />
        <img
          src="/images/rightbar.svg"
          alt="Decorative right bar"
          className="right-svg svg-block"
          ref={(el) => (svgRefs.current[1] = el)}
        />

        <div id="homepage-logo-login-bar">
          <div className="homepage-logo-section">
            <p>MIND MATRIX</p>
          </div>
          <div className="homepage-login-section">
            <span>Already a User</span>
            <Link to={"/user/login"}>
              <NormalButtons text="Login" type="normal" />
            </Link>
          </div>
        </div>
        <div id="homepage-hero-section">
          <h1 className="hero-header">
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
          </h1>
          <h2 className="hero-subheader">
            You're not alone. Take control of your mental health with Mind
            Matrix
          </h2>
          <Link to={"/user/login"} className="linkdashboard">
            <Button text="Get Started" />
          </Link>
          <div className="home-features">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="home-cards"
                ref={(el) => (cardsRef.current[index] = el)}
              ></div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
