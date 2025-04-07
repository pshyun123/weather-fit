import React from "react";
import styled from "styled-components";
import OutfitCarousel from "./OutfitCarousel";

const OutfitsRecommendComp = styled.section`
  padding: 60px 0;
  background-color: #f9f9f9;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  .container {
  }

  .section-title {
    font-size: 36px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const OutfitsRecommend = () => {
  // 아웃핏 데이터
  const outfitData = [
    {
      title: "겨울 코트",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "스카프 코디",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "부츠 스타일",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "따뜻한 니트",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "패딩 점퍼",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "겨울 코트",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "스카프 코디",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "부츠 스타일",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "따뜻한 니트",
      imageUrl: "https://via.placeholder.com/220x300",
    },
    {
      title: "패딩 점퍼",
      imageUrl: "https://via.placeholder.com/220x300",
    },
  ];

  return (
    <OutfitsRecommendComp>
      <div className="container">
        <h2 className="section-title">지금 날씨에 이런 옷은 어때요?</h2>
        <OutfitCarousel outfits={outfitData} />
      </div>
    </OutfitsRecommendComp>
  );
};

export default OutfitsRecommend;
