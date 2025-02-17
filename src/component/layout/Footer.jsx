import React from "react";
import {
  FooterLeftContainer,
  FooterRightContainer,
  FooterContainer,
} from "./FooterStyle";
import { Link } from "react-router-dom";
import youtubeIcon from "../../assets/youtube-icon.png";
import twitterIcon from "../../assets/twitter-icon.png";
import facebookIcon from "../../assets/facebook-icon.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLeftContainer>
        <div className="footer-content">
          <div className="customer-service">고객센터</div>
          <div className="phone-number">
            1577-0000<span>(평일 9시~18시)</span>
          </div>
          <div className="email">이메일 문의: support@wweather.com</div>
          <div className="address">
            서울특별시 강남구 테헤란로 123, WE타워 15층
            <br />
            대표이사: 김날씨
            <br />
            사업자등록번호: 123-45-67890
            <br />
            통신판매업신고: 제2023-서울강남-0123호
          </div>
          <div className="bottom-row">
            <div className="links">
              <Link to="/privacy">이용약관</Link>
              <Link to="/terms">개인정보처리방침</Link>
            </div>
          </div>
        </div>
      </FooterLeftContainer>

      <FooterRightContainer>
        <div className="right-column">
          <div className="social-icons">
            <img src={youtubeIcon} alt="YouTube" />
            <img src={twitterIcon} alt="Twitter" />
            <img src={facebookIcon} alt="Facebook" />
          </div>
          <div className="copyright">
            © 2025 WeatherFit.All rights reserved.
          </div>
        </div>
      </FooterRightContainer>
    </FooterContainer>
  );
};

export default Footer;
