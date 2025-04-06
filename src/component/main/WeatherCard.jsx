import React from "react";
import styled from "styled-components";
import sunnyIcon from "../../images/sunnynohand.png";

const WeatherCardContainer = styled.div`
  background-color: #ffcdd2;
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

  .location {
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

  .location-icon {
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
`;

const WeatherCard = ({
  date = "2025년 7월 22일",
  location = "현재 날씨",
  city = "서빙고동",
  temperature = "23°C",
  humidity = "38%",
  wind = "0.9m/s",
}) => {
  return (
    <WeatherCardContainer>
      <div className="date">{date}</div>
      <div className="location">{location}</div>

      <div className="weather-icon">
        <img src={sunnyIcon} alt="맑음" />
      </div>

      <div className="city">
        <span className="location-icon">⦿</span>
        <span className="city-name">{city}</span>
      </div>

      <div className="temperature">{temperature}</div>

      <div className="weather-details">
        <div>습도 {humidity}</div>
        <div className="divider"></div>
        <div>풍속 {wind}</div>
      </div>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
