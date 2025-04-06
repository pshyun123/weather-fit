import React, { useState } from "react";
import styled from "styled-components";

const OutfitsPreferComp = styled.section`
  padding: 60px 0;
  background-color: #fff;

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

  .style-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    gap: 15px;
    flex-wrap: wrap;
  }

  .style-tab {
    padding: 8px 20px;
    border-radius: 30px;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 14px;

    &.active {
      background-color: #4981f8;
      color: white;
      border-color: #4981f8;
    }

    &:hover {
      background-color: #f5f5f5;
      &.active {
        background-color: #4981f8;
      }
    }
  }

  .style-grid {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    position: relative;
  }

  .style-card {
    width: 150px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .carousel-controls {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }

  .control-arrow {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    font-size: 20px;
    color: #333;

    &:hover {
      background-color: white;
    }
  }
`;

const OutfitsPrefer = () => {
  const [activeTab, setActiveTab] = useState("모던");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <OutfitsPreferComp>
      <div className="container">
        <h2 className="section-title">취향에 맞는 스타일을 찾아보세요</h2>

        <div className="style-tabs">
          <div
            className={`style-tab ${activeTab === "미니멀" ? "active" : ""}`}
            onClick={() => handleTabClick("미니멀")}
          >
            미니멀
          </div>
          <div
            className={`style-tab ${activeTab === "모던" ? "active" : ""}`}
            onClick={() => handleTabClick("모던")}
          >
            모던
          </div>
          <div
            className={`style-tab ${activeTab === "스트릿" ? "active" : ""}`}
            onClick={() => handleTabClick("스트릿")}
          >
            스트릿
          </div>
          <div
            className={`style-tab ${activeTab === "캐주얼" ? "active" : ""}`}
            onClick={() => handleTabClick("캐주얼")}
          >
            캐주얼
          </div>
          <div
            className={`style-tab ${activeTab === "러블리" ? "active" : ""}`}
            onClick={() => handleTabClick("러블리")}
          >
            러블리
          </div>
        </div>

        <div className="style-grid">
          <div className="style-card">
            <img
              src="https://via.placeholder.com/150x200"
              alt="스타일 이미지"
            />
          </div>
          <div className="style-card">
            <img
              src="https://via.placeholder.com/150x200"
              alt="스타일 이미지"
            />
          </div>
          <div className="style-card">
            <img
              src="https://via.placeholder.com/150x200"
              alt="스타일 이미지"
            />
          </div>
          <div className="style-card">
            <img
              src="https://via.placeholder.com/150x200"
              alt="스타일 이미지"
            />
          </div>
          <div className="style-card">
            <img
              src="https://via.placeholder.com/150x200"
              alt="스타일 이미지"
            />
          </div>

          <div className="carousel-controls">
            <div className="control-arrow">❮</div>
            <div className="control-arrow">❯</div>
          </div>
        </div>
      </div>
    </OutfitsPreferComp>
  );
};

export default OutfitsPrefer;
