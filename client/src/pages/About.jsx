import React from "react";
import { AboutContainer } from "../styles/pages/aboutPageStyles";

const About = () => {
  return (
    <AboutContainer>
      <header className="header">
        <h1>About ScholarEase</h1>
        <div className="image-container">
          <img
            src="/images/about.jpg"
            className="about-image"
            alt="scholarship"
          />
        </div>
      </header>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At the ScholarEase, our mission is to empower students by bridging the
          gap between education and affordability...
        </p>
      </section>
      <section className="sets-apart">
        <h2>What Sets Us Apart</h2>
        <p>
          Our platform boasts an extensive and constantly updated database of
          scholarships from various sources, including educational institutions,
          foundations, corporations, and more. We aim to provide you with a
          diverse selection of scholarship opportunities tailored to your field
          of study, interests, and background
        </p>
      </section>
      <section className="get-started">
        <h2>Get Started</h2>
        <p>
          Are you ready to embark on your journey towards educational success?
          Create an account today...
        </p>
      </section>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          We value your feedback and questions. If you have any inquiries or
          suggestions, please don't hesitate to reach out to our support team at{" "}
          <a href="mailto:scholarease0@gmail.com">scholarease0@gmail.com</a>.
        </p>
      </section>
    </AboutContainer>
  );
};

export default About;
