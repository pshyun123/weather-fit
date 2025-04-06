import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import WeatherCard from "./WeatherCard";

const CarouselSection = styled.div`
  padding: 60px 0;
  width: 100%;
  border-radius: 0;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 40px 0;
  perspective: 1000px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  transform-style: preserve-3d;
`;

const CarouselSlide = styled.div`
  position: absolute;
  width: 480px;
  transform: ${(props) => {
    const offset = props.$index - props.$activeIndex;
    if (offset === 0) return "translateX(0) scale(1) translateZ(0)";

    // 비활성화된 카드는 오른쪽으로 살짝 이동하고 크기를 줄이고 뒤쪽에 배치
    const xOffset = offset * 40; // 오른쪽으로 40px씩 이동
    const zOffset = offset * -50; // 뒤로 50px씩 이동
    const scale = 1 - Math.abs(offset) * 0.05; // 크기를 5%씩 줄임

    return `translateX(${xOffset}px) scale(${scale}) translateZ(${zOffset}px)`;
  }};
  opacity: ${(props) =>
    Math.abs(props.$index - props.$activeIndex) > 2 ? 0 : 1};
  z-index: ${(props) => 10 - Math.abs(props.$index - props.$activeIndex)};
  transition: all 0.5s ease-in-out;
  box-shadow: ${(props) =>
    props.$index === props.$activeIndex
      ? "0 10px 20px rgba(0, 0, 0, 0.15)"
      : "0 5px 10px rgba(0, 0, 0, 0.1)"};
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
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

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

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const diffX = e.clientX - startX;

    // 충분한 거리를 드래그했을 때만 슬라이드 변경
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && activeIndex > 0) {
        // 오른쪽으로 드래그 - 이전 슬라이드
        setActiveIndex(activeIndex - 1);
      } else if (diffX < 0 && activeIndex < cards.length - 1) {
        // 왼쪽으로 드래그 - 다음 슬라이드
        setActiveIndex(activeIndex + 1);
      }

      // 드래그 상태 리셋
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 컴포넌트 바깥에서 마우스 버튼을 놓은 경우에도 드래그 상태 리셋
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // 터치 이벤트 핸들러 - 모바일 지원
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const diffX = e.touches[0].clientX - startX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (diffX < 0 && activeIndex < cards.length - 1) {
        setActiveIndex(activeIndex + 1);
      }

      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <CarouselSection>
      <CarouselContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CarouselWrapper>
          {cards.map((card, index) => (
            <CarouselSlide
              key={index}
              $index={index}
              $activeIndex={activeIndex}
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
      </CarouselContainer>

      <CarouselDots>
        {cards.map((_, index) => (
          <CarouselDot
            key={index}
            $active={activeIndex === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </CarouselDots>
    </CarouselSection>
  );
};

export default WeatherCardCarousel;
