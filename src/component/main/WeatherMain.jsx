import React from "react";
import styled from "styled-components";
import mainImg from "../../images/main_bg.png";
import WeatherCardCarousel from "./WeatherCardCarousel";
import arrowImage from "../../images/carouselarrow.png";
import cloudImage from "../../images/cloud.png";

const MainBannerComp = styled.section`
  background-color: #ffb8b8;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  overflow: hidden;

  .sectionWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .left-text {
    position: absolute;
    left: 15%;
    top: 30%;
    color: rgba(63, 63, 63, 1);
    text-align: left;
    z-index: 1;
    font-size: 28px;
    font-weight: 500;
    line-height: 140%;
  }

  .right-text {
    position: absolute;
    right: 10%;
    top: 50%;
    color: rgba(63, 63, 63, 0.8);
    text-align: right;
    z-index: 1;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    max-width: 400px;
  }

  .cloud-image-right {
    position: absolute;
    right: 18%;
    top: 12%;
    width: 240px;
    height: 150px;
    opacity: 0.4;
  }

  .cloud-image-right-image {
    width: 100%;
    height: 100%;
  }

  .cloud-image-left {
    position: absolute;
    right: 4%;
    top: 58%;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: 0;
  }

  .cloud-image-left-image {
    width: 600px;
    height: 450px;
  }

  .bottom-arrow {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    z-index: 2;
    width: 50px;
    height: 50px;
  }

  .bottom-arrow-image {
    width: 50px;
    height: 50px;
  }

  .carousel-container {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
`;

const MainBanner = () => {
  // 날씨 카드 데이터
  const weatherData = [
    {
      date: "2025년 7월 22일",
      location: "현재 날씨",
      city: "서빙고동",
      temperature: "23°C",
      humidity: "38%",
      wind: "0.9m/s",
    },
    {
      date: "2025년 7월 23일",
      location: "내일 날씨",
      city: "서빙고동",
      temperature: "25°C",
      humidity: "40%",
      wind: "0.8m/s",
    },
    {
      date: "2025년 7월 24일",
      location: "모레 날씨",
      city: "서빙고동",
      temperature: "22°C",
      humidity: "65%",
      wind: "1.2m/s",
    },
  ];

  return (
    <>
      <MainBannerComp>
        <div className="sectionWrapper">
          <div className="left-text">
            <p>오늘은 어떤 옷을 입어야 하지?</p>
            <p>고민되는 순간, 웨더핏!</p>
          </div>

          <div className="right-text">
            <p>왼쪽으로 밀어서 오늘의 날씨를 확인해보세요</p>
            <p>아래로 스크롤 하면</p>
            <p>오늘의 날씨에 맞는 핏을 골라볼 수 있어요!</p>
          </div>

          <div className="cloud-image-right">
            <img
              src={cloudImage}
              alt="구름"
              className="cloud-image-right-image"
            />
          </div>
          <div className="cloud-image-left">
            <img
              src={cloudImage}
              alt="구름"
              className="cloud-image-left-image"
            />
          </div>

          <div className="carousel-container">
            <WeatherCardCarousel weatherCards={weatherData} />
          </div>

          <div className="bottom-arrow">
            <img
              src={arrowImage}
              alt="아래로 스크롤"
              className="bottom-arrow-image"
            />
          </div>
        </div>
      </MainBannerComp>
    </>
  );
};

export default MainBanner;
