import React from "react";
import {
  FooterLeftContainer,
  FooterRightContainer,
  FooterContainer,
  FooterBottomContainer,
} from "./FooterStyle";
import { Link } from "react-router-dom";
import youtubeIcon from "../../images/youtube-icon.png";
import twitterIcon from "../../images/twitter-icon.png";
import facebookIcon from "../../images/facebook-icon.png";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="inner-container">
        <FooterLeftContainer>
          <div className="footer-content">
            <div className="customer-service">고객센터</div>
            <div className="phone-number">
              1577-0000<span>(평일 9시~18시)</span>
            </div>
            <div className="email">이메일 문의: support@wweather.com</div>
            <div className="address">
              대표이사: 김날씨
              <br />
              주소: 서울특별시 마포구 성산로 123, WEST동 10층(성산동, 웨더빌딩)
              <br />
              사업자등록번호: 123-45-67890
              <br />
              통신판매업신고: 제2023-서울강남-0123호
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
          </div>
        </FooterRightContainer>
      </div>
      <FooterBottomContainer>
        <div className="bottom-row">
          <div className="bottom-line"></div>
          <div className="bottom-row-content">
            <div className="links">
              <Link to="/privacy">이용약관 </Link>
              <div className="link-divider">|</div>
              <Link to="/terms">개인정보처리방침</Link>
            </div>

            <div className="copyright">
              © 2025 WeatherFit. All rights reserved.
            </div>
          </div>
        </div>
      </FooterBottomContainer>
    </FooterContainer>
  );
};

export default Footer;
