import React from "react";
import styled from "styled-components";

const OutfitsRecommendComp = styled.section`
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

  .outfits-grid {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 10px 0;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .outfit-card {
    min-width: 220px;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;

    &:hover {
      transform: translateY(-5px);
      transition: transform 0.3s ease;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .outfit-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
      padding: 20px 15px;
      color: white;
    }
  }

  .carousel-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
  }

  .control-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ddd;

    &.active {
      background-color: #4981f8;
    }
  }
`;

const OutfitsRecommend = () => {
  return (
    <OutfitsRecommendComp>
      <div className="container">
        <h2 className="section-title">지금 날씨에 어떤 옷은 어때요?</h2>

        <div className="outfits-grid">
          <div className="outfit-card">
            <img
              src="https://via.placeholder.com/220x300"
              alt="날씨에 맞는 옷 추천"
            />
            <div className="outfit-overlay">
              <h3>겨울 코트</h3>
            </div>
          </div>

          <div className="outfit-card">
            <img
              src="https://via.placeholder.com/220x300"
              alt="날씨에 맞는 옷 추천"
            />
            <div className="outfit-overlay">
              <h3>스카프 코디</h3>
            </div>
          </div>

          <div className="outfit-card">
            <img
              src="https://via.placeholder.com/220x300"
              alt="날씨에 맞는 옷 추천"
            />
            <div className="outfit-overlay">
              <h3>부츠 스타일</h3>
            </div>
          </div>

          <div className="outfit-card">
            <img
              src="https://via.placeholder.com/220x300"
              alt="날씨에 맞는 옷 추천"
            />
            <div className="outfit-overlay">
              <h3>따뜻한 니트</h3>
            </div>
          </div>

          <div className="outfit-card">
            <img
              src="https://via.placeholder.com/220x300"
              alt="날씨에 맞는 옷 추천"
            />
            <div className="outfit-overlay">
              <h3>패딩 점퍼</h3>
            </div>
          </div>
        </div>

        <div className="carousel-controls">
          <div className="control-dot active"></div>
          <div className="control-dot"></div>
          <div className="control-dot"></div>
        </div>
      </div>
    </OutfitsRecommendComp>
  );
};

export default OutfitsRecommend;
