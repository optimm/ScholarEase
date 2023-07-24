import React from "react";
import { useNavigate } from "react-router-dom";
import { LandingContainer, LandingOverlay } from "../styles/pages/homeStyles";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <LandingContainer url="/images/landing.jpg">
        <LandingOverlay>
          <div className="section-main">
            <div className="text-main">
              Welcome To <span className="text-main-span">ScholarEase</span>
            </div>
            <div className="text-sub">
            Find scholarships effortlessly. Excellent recommendations. 
             Empowering students. Join us on your journey!
            </div>
            <div className="button-container">
              <button
                className="button-main"
                onClick={() => navigate("/projects")}
              >
                Discover Scholarships
              </button>
            </div>
          </div>
        </LandingOverlay>
      </LandingContainer>
    </>
  );
};

export default Home;
