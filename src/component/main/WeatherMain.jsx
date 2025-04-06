import React from "react";
import styled from "styled-components";
import mainImg from "../../images/main_bg.png";
import WeatherCardCarousel from "./WeatherCardCarousel";

const MainBannerComp = styled.section`
  background-image: url(${mainImg});
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
  position: relative;

  .sectionWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info-text {
    position: absolute;
    left: 192px;
    top: 424px;
    color: rgba(63, 63, 63, 1);
    text-align: left;
    z-index: 1;
    font-size: 32px;
    font-weight: 400;
    line-height: 100%;
  }

  .cloud-image {
    position: absolute;
    right: 80px;
    top: 100px;
    width: 120px;
    height: 120px;
    opacity: 0.8;
  }

  .bottom-arrow {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }

  .carousel-container {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
`;

const MainBanner = () => {
  // 날씨 카드 데이터
  const weatherData = [
    {
      date: "2023년 7월 27일",
      location: "현재 날씨",
      city: "서울구로구",
      temperature: "23°C",
      humidity: "38%",
      wind: "0.6m/s",
      weatherIcon: "sunny",
    },
    {
      date: "2023년 7월 28일",
      location: "내일 날씨",
      city: "서울구로구",
      temperature: "25°C",
      humidity: "40%",
      wind: "0.8m/s",
      weatherIcon: "cloudy",
    },
    {
      date: "2023년 7월 29일",
      location: "모레 날씨",
      city: "서울구로구",
      temperature: "22°C",
      humidity: "65%",
      wind: "1.2m/s",
      weatherIcon: "rainy",
    },
  ];

  return (
    <>
      <MainBannerComp>
        <div className="sectionWrapper">
          <div className="info-text">
            <p>오늘은 어떤 옷을 입어야 하지?</p>
            <p>고민되는 순간, 웨더핏!</p>
          </div>

          <div className="carousel-container">
            <WeatherCardCarousel weatherCards={weatherData} />
          </div>

          <div className="bottom-arrow">
            <span>⌄</span>
          </div>
        </div>
      </MainBannerComp>
    </>
  );
};

export default MainBanner;
