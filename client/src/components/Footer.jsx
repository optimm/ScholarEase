import React from "react";
import { FooterWrapper } from "../styles/components/footerStyles";
import ProfileIcon from "./ProfileIcon";

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="icons-section">
        <a href="https://github.com/optimm" target="_blank" rel="noreferrer">
          <ProfileIcon platform={"github"} />
        </a>
        <a
          href="https://www.linkedin.com/in/ayush-saxena-b5b099203/"
          target="_blank"
          rel="noreferrer"
        >
          <ProfileIcon platform={"linkedin"} />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <ProfileIcon platform={"instagram"} />
        </a>
      </div>
      <div className="text-section">© 2023 Devhub. Created by Ayush Saxena</div>
    </FooterWrapper>
  );
};

export default Footer;
