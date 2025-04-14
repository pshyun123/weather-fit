import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WeatherCardCarousel from "./WeatherCardCarousel";
import arrowImage from "../../images/carouselarrow.png";
import cloudImage from "../../images/cloud.png";
import { getCurrentWeather, getWeatherForecast } from "../../api/WeatherApi";

const MainBannerComp = styled.section`
  background-color: #ffb8b8;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  .cloud-image {
    position: absolute;
    opacity: 0.4;

    &.right {
      right: 18%;
      top: 12%;
      width: 240px;
      height: 150px;
    }

    &.left {
      right: 4%;
      top: 58%;
      z-index: 0;

      img {
        width: 600px;
        height: 450px;
      }
    }
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

    img {
      width: 100%;
      height: 100%;
    }
  }

  .carousel-container {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
`;

const WeatherMain = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const [currentData, forecastData] = await Promise.all([
          getCurrentWeather(),
          getWeatherForecast(),
        ]);

        setCurrentWeather(currentData);
        setForecastWeather(forecastData);
        setLoading(false);
      } catch (err) {
        console.error("날씨 데이터 로딩 실패:", err);
        setError("날씨 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // 소수점 첫째자리까지 온도 포맷팅 함수
  const formatTemperature = (temp) => {
    return parseFloat(temp).toFixed(1);
  };

  // 예보 시간 간격 포맷팅 함수
  const formatForecastLocation = (index) => {
    if (index === 0) return "현재 날씨";
    if (index === 1) return "1시간 후";
    return `${index}시간 후`;
  };

  // 날씨 데이터를 카드 형식으로 변환
  const weatherCards = () => {
    const cards = [];

    // 현재 날씨 카드 추가
    if (currentWeather) {
      // 날짜 형식 변환 (LocalDateTime -> 문자열)
      const weatherDate = new Date(currentWeather.weatherDate);
      const formattedDate = `${weatherDate.getFullYear()}년 ${
        weatherDate.getMonth() + 1
      }월 ${weatherDate.getDate()}일`;

      cards.push({
        date: formattedDate,
        location: "현재 날씨",
        city: "서빙고동",
        temperature: `${formatTemperature(currentWeather.currentTemp)}°C`,
        humidity: `${currentWeather.currentHumidity}%`,
        wind: `${formatTemperature(currentWeather.currentWindSpeed)}m/s`,
        weatherCondition: currentWeather.weatherCondition || "SUNNY",
        minTemp: formatTemperature(currentWeather.minTemp),
        maxTemp: formatTemperature(currentWeather.maxTemp),
        time: currentWeather.weatherTime,
      });
    }

    // 예보 날씨 카드 추가 - 시간별로 표시
    forecastWeather.forEach((forecast, index) => {
      // 날짜 및 시간 형식 변환
      let formattedDate = "";
      let formattedTime = "";

      // 날짜 형식 변환 (YYYY-MM-DD -> YYYY년 MM월 DD일)
      if (forecast.forecastDate) {
        const dateParts = forecast.forecastDate.split("-");
        formattedDate = `${dateParts[0]}년 ${parseInt(
          dateParts[1]
        )}월 ${parseInt(dateParts[2])}일`;
      } else {
        const date = new Date();
        formattedDate = `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일`;
      }

      // 시간 형식 변환 (HH:MM:SS -> HH:MM)
      if (forecast.forecastTime) {
        formattedTime = forecast.forecastTime.substring(0, 5);
      }

      // 시간별 위치 텍스트
      const locationText = formatForecastLocation(index + 1);

      cards.push({
        date: formattedDate,
        location: locationText,
        city: "서빙고동",
        temperature: `${formatTemperature(forecast.forecastTemp || 0)}°C`,
        humidity: `${forecast.forecastHumidity || 0}%`,
        wind: `${formatTemperature(forecast.forecastWindSpeed || 0)}m/s`,
        weatherCondition: forecast.forecastWeatherCondition || "SUNNY",
        minTemp: formatTemperature(forecast.forecastTempMin || 0),
        maxTemp: formatTemperature(forecast.forecastTempMax || 0),
        description: forecast.forecastDescription || "",
        time: formattedTime,
        // 좌표 정보도 추가
        latitude: forecast.forecastLatitude,
        longitude: forecast.forecastLongitude,
      });
    });

    // 카드가 없는 경우 기본 카드 추가
    if (cards.length === 0) {
      cards.push({
        date: "날씨 정보를 불러올 수 없습니다",
        location: "정보 없음",
        city: "서빙고동",
        temperature: "0.0°C",
        humidity: "0%",
        wind: "0.0m/s",
        weatherCondition: "SUNNY",
      });
    }

    // 카드 개수 제한 (최대 6개까지만 표시)
    return cards.slice(0, 6);
  };

  if (loading) return <div>날씨 정보를 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  return (
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

        <div className="cloud-image right">
          <img src={cloudImage} alt="구름" />
        </div>

        <div className="cloud-image left">
          <img src={cloudImage} alt="구름" />
        </div>

        <div className="carousel-container">
          <WeatherCardCarousel weatherData={weatherCards()} />
        </div>

        <div className="bottom-arrow">
          <img src={arrowImage} alt="아래로 스크롤" />
        </div>
      </div>
    </MainBannerComp>
  );
};

export default WeatherMain;
