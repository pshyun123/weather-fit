import React, { useState } from "react";
import styled from "styled-components";
import WeatherCard from "./WeatherCard";
import arrowImage from "../../images/carouselarrow.png";

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 40px 20px;
  overflow: visible;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 780px;
  display: flex;
  justify-content: center;
`;

const CarouselSlide = styled.div`
  position: absolute;
  left: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
  width: 480px;
  z-index: ${(props) => props.$position.z};
  transform: ${(props) =>
    props.$position.scale ? `scale(${props.$position.scale})` : "scale(1)"};
  transition: all 0.5s ease-in-out;
  opacity: ${(props) =>
    props.$position.opacity !== undefined ? props.$position.opacity : 1};
  display: ${(props) => (props.$position.visible ? "block" : "none")};
`;

const NavArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  &.prev {
    left: -30px;
    transform: translateY(-50%) rotate(180deg);
  }

  &.next {
    right: -30px;
  }
`;

const ArrowImage = styled.img`
  width: 30px;
  height: 30px;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2));
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

const CarouselDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#4981f8" : "#ddd")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? "#4981f8" : "#bbb")};
  }
`;

const WeatherCardCarousel = ({ weatherCards = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 기본 날씨 데이터
  const defaultWeatherCards = [
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

  // 전달된 데이터가 없으면 기본 데이터 사용
  const cards = weatherCards.length > 0 ? weatherCards : defaultWeatherCards;

  // 카드 위치 계산 함수 - 3개의 카드만 표시하도록 수정
  const getCardPosition = (index) => {
    // 활성 카드와의 상대적 위치 계산
    const totalCards = cards.length;
    const relativePosition = (index - activeIndex + totalCards) % totalCards;

    // 현재 보이는 활성 카드 (중앙)
    if (relativePosition === 0) {
      return {
        x: 0,
        y: 0,
        z: 10,
        opacity: 1,
        scale: 1,
        visible: true,
      };
    }

    // 바로 다음 카드 (오른쪽)
    if (relativePosition === 1) {
      return {
        x: 40,
        y: 0,
        z: 9,
        opacity: 0.85,
        scale: 0.96,
        visible: true,
      };
    }

    // 바로 이전 카드 (뒤쪽)
    if (relativePosition === totalCards - 1) {
      return {
        x: 80, // 첫-둘 차이만큼 더 이동 (40 + 40)
        y: 0, // y는 0으로 유지
        z: 8, // z 인덱스도 동일한 차이 (9 - 1 = 8)
        opacity: 0.7, // 투명도도 비슷한 차이 (0.85 - 0.15 = 0.70)
        scale: 0.94, // 크기도 비슷한 차이 (0.98 - 0.02 = 0.96)
        visible: true,
      };
    }

    // 나머지 카드는 숨김
    return {
      x: 0,
      y: 0,
      z: 0,
      opacity: 0,
      visible: false,
    };
  };

  // 다음 카드로 이동
  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // 이전 카드로 이동
  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // 특정 카드로 이동
  const handleDotClick = (index) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <>
      <CarouselContainer>
        <NavArrow className="prev" onClick={handlePrev}>
          <ArrowImage src={arrowImage} alt="이전" />
        </NavArrow>

        <CarouselWrapper>
          {cards.map((card, index) => (
            <CarouselSlide
              key={`${card.date}-${index}`}
              $index={index}
              $activeIndex={activeIndex}
              $position={getCardPosition(index)}
            >
              <WeatherCard
                date={card.date}
                location={card.location}
                city={card.city}
                temperature={card.temperature}
                humidity={card.humidity}
                wind={card.wind}
              />
            </CarouselSlide>
          ))}
        </CarouselWrapper>

        <NavArrow className="next" onClick={handleNext}>
          <ArrowImage src={arrowImage} alt="다음" />
        </NavArrow>
      </CarouselContainer>

      <CarouselDots>
        {cards.map((_, index) => (
          <CarouselDot
            key={index}
            $active={index === activeIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </CarouselDots>
    </>
  );
};

export default WeatherCardCarousel;
