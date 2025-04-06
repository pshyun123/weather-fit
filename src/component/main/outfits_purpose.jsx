import React from "react";
import styled from "styled-components";

const OutfitsPurposeComp = styled.section`
  padding: 60px 0;
  background-color: #f9f9f9;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
  }

  .situations-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }

  .situation-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }

  .situation-card {
    position: relative;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 10px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

const OutfitsPurpose = () => {
  const situations = [
    { id: 1, name: "데일리", image: "https://via.placeholder.com/300x250" },
    { id: 2, name: "워크웨어", image: "https://via.placeholder.com/300x250" },
    { id: 3, name: "데이트", image: "https://via.placeholder.com/300x250" },
    { id: 4, name: "모임", image: "https://via.placeholder.com/300x250" },
    { id: 5, name: "운동", image: "https://via.placeholder.com/300x250" },
    { id: 6, name: "여행", image: "https://via.placeholder.com/300x250" },
    { id: 7, name: "비즈니스", image: "https://via.placeholder.com/300x250" },
    { id: 8, name: "이벤트", image: "https://via.placeholder.com/300x250" },
  ];

  // 상황별 카드를 2x4 그리드로 렌더링
  const renderSituationCards = () => {
    return situations.map((situation) => (
      <div key={situation.id} className="situation-card">
        <img src={situation.image} alt={situation.name} />
        <div className="card-label">{situation.name}</div>
      </div>
    ));
  };

  return (
    <OutfitsPurposeComp>
      <div className="container">
        <h2 className="section-title">
          어디에 가시나요? 상황에 맞는 옷을 추천합니다
        </h2>

        <div className="situations-grid">{renderSituationCards()}</div>
      </div>
    </OutfitsPurposeComp>
  );
};

export default OutfitsPurpose;
