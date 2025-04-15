import React from "react";
import styled from "styled-components";
import sunnyIcon from "../../images/sunnynohand.png";
import rainyIcon from "../../images/raniny.png";
import snowyIcon from "../../images/snowy.png";
import hotIcon from "../../images/hot.png";
import warmIcon from "../../images/hot.png";
import midIcon from "../../images/sunnynohand.png";
import coldIcon from "../../images/cold.png";
import chillIcon from "../../images/chill.png";

const WeatherCardContainer = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(226, 226, 226, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  width: 480px;
  height: 780px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  .date {
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .time {
    color: #888;
    font-size: 12px;
    margin-bottom: 28px;
  }

  .description {
    font-weight: 500;
    font-size: 18px;
    color: #333;
    margin-bottom: 32px;
  }

  .weather-icon {
    width: 250px;
    height: 250px;
    margin: 0 auto 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .weather-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .city {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-bottom: 10px;
    color: #555;
  }

  .description-icon {
    font-size: 18px;
  }

  .city-name {
    font-size: 16px;
  }

  .temperature {
    font-size: 64px;
    font-weight: bold;
    color: #333;
    margin-bottom: 24px;
    line-height: 1;
  }

  .temperature-range {
    font-size: 16px;
    color: #666;
    margin-bottom: 24px;
  }

  .weather-details {
    display: flex;
    justify-content: center;
    gap: 20px;
    color: #666;
    font-size: 14px;
  }

  .divider {
    width: 4px;
    height: 4px;
    background-color: #ddd;
    border-radius: 50%;
    margin: 0 5px;
    align-self: center;
  }

  .weather-description {
    margin-top: 16px;
    color: #666;
    font-size: 14px;
  }

  .coordinates {
    margin-top: 10px;
    color: #888;
    font-size: 12px;
  }
`;

// 날씨 상태에 따른 아이콘 매핑
const getWeatherIcon = (weatherCondition) => {
  switch (weatherCondition) {
    case "HOT":
      return hotIcon;
    case "WARM":
      return warmIcon;
    case "MID":
      return midIcon;
    case "COLD":
      return coldIcon;
    case "CHILL":
      return chillIcon;
    case "RAIN":
      return rainyIcon;
    case "SNOW":
      return snowyIcon;
    default:
      return sunnyIcon;
  }
};

// 날씨 상태 한글 변환
const getWeatherDescription = (weatherCondition) => {
  switch (weatherCondition) {
    case "HOT":
      return "더움";
    case "WARM":
      return "따뜻함";
    case "MID":
      return "중간";
    case "COLD":
      return "추움";
    case "CHILL":
      return "한파";
    case "RAIN":
      return "비";
    case "SNOW":
      return "눈";
    default:
      return "맑음";
  }
};

const WeatherCard = ({
  date = "2025년 7월 22일",
  description = "현재 날씨",
  location = "서빙고동",
  temperature = "23°C",
  humidity = "38%",
  wind = "0.9m/s",
  weatherCondition = "SUNNY",
  minTemp,
  maxTemp,

  time,
  latitude,
  longitude,
}) => {
  // 좌표 정보가 있는 경우에만 좌표 문자열 생성
  const hasCoordinates = latitude !== undefined && longitude !== undefined;
  const coordinatesText = hasCoordinates
    ? `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
    : "";

  return (
    <WeatherCardContainer>
      <div className="date">{date}</div>
      {time && <div className="time">{time}</div>}
      <div className="description">{description}</div>

      <div className="weather-icon">
        <img
          src={getWeatherIcon(weatherCondition)}
          alt={getWeatherDescription(weatherCondition)}
        />
      </div>

      <div className="city">
        <span className="description-icon">⦿</span>
        <span className="city-name">{location}</span>
      </div>

      {hasCoordinates && (
        <div className="coordinates">
          <small>좌표: {coordinatesText}</small>
        </div>
      )}

      <div className="temperature">{temperature}</div>
      {minTemp !== undefined && maxTemp !== undefined && (
        <div className="temperature-range">
          최저 {minTemp}°C / 최고 {maxTemp}°C
        </div>
      )}

      <div className="weather-details">
        <div>습도 {humidity}</div>
        <div className="divider"></div>
        <div>풍속 {wind}</div>
      </div>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
