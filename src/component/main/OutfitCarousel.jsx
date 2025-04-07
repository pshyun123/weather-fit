import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import OutfitCard from "./OutfitCard";
import arrowImage from "../../images/carouselarrow.png";

const CarouselContainer = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 20px 0 40px;
`;

const CarouselHeading = styled.h2`
  color: white;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: normal;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
  transition: transform ${(props) => (props.$isHovered ? "0s" : "30s")} linear
    infinite;
  transform: translateX(${(props) => props.$translateX}%);
  &:hover {
    animation-play-state: paused;
  }
`;

const OutfitCarousel = ({ outfits = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef(null);

  // 기본 아웃핏 데이터
  const defaultOutfits = [
    {
      title: "겨울 코트",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "스카프 코디",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "부츠 스타일",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "따뜻한 니트",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "패딩 점퍼",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "겨울 코트 2",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "스카프 코디 2",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "부츠 스타일 2",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "따뜻한 니트 2",
      imageUrl: "https://via.placeholder.com/410x546",
    },
    {
      title: "패딩 점퍼 2",
      imageUrl: "https://via.placeholder.com/410x546",
    },
  ];

  // 전달된 데이터가 없으면 기본 데이터 사용
  const cards = outfits.length > 0 ? outfits : defaultOutfits;

  // 무한 스크롤을 위한 아이템 복제
  const duplicatedCards = [...cards, ...cards];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setTranslateX((prev) => {
          if (prev <= -100) {
            return 0;
          }
          return prev - 0.01;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <CarouselContainer>
      <CarouselHeading>지금 날씨에 이런 옷은 어때요?</CarouselHeading>

      <CarouselTrack
        ref={trackRef}
        $isHovered={isHovered}
        $translateX={translateX}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicatedCards.map((outfit, index) => (
          <OutfitCard
            key={`${outfit.title}-${index}`}
            title={outfit.title}
            imageUrl={outfit.imageUrl}
          />
        ))}
      </CarouselTrack>
    </CarouselContainer>
  );
};

export default OutfitCarousel;
