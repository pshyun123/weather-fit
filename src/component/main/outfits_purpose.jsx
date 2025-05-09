import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import daillyImage from "../../images/daillydumy.jpg";
import weddingImage from "../../images/weadingdumy.jpg";
import travelImage from "../../images/traveldumy.jpg";
import rainyImage from "../../images/raindaydumy.jpg";
import partyImage from "../../images/partydumy.jpg";
import officeImage from "../../images/officedumy.jpg";
import coldImage from "../../images/winterdumy.jpg";
import dateImage from "../../images/datedumy.jpg";
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
    gap: 4px;

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
    border: 1px solid #e0e0e0;
    &:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: black;
      padding: 10px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
`;

const OutfitsPurpose = () => {
  const navigate = useNavigate();

  const situations = [
    { id: 1, name: "데일리룩", image: daillyImage },
    { id: 2, name: "하객룩", image: weddingImage },
    { id: 3, name: "휴양지룩", image: travelImage },
    { id: 4, name: "장마룩", image: rainyImage },
    { id: 5, name: "파티룩", image: partyImage },
    { id: 6, name: "오피스룩", image: officeImage },
    { id: 7, name: "한파룩", image: coldImage },
    { id: 8, name: "데이트룩", image: dateImage },
  ];

  // 상황별 카드를 2x4 그리드로 렌더링
  const renderSituationCards = () => {
    return situations.map((situation) => (
      <div
        key={situation.id}
        className="situation-card"
        onClick={() => navigate(`/purpose`)}
        style={{ cursor: "pointer" }}
      >
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
