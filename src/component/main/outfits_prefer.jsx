import React, { useState } from "react";
import styled from "styled-components";
import OutfitsPreferCard from "./OutfitsPreferCard";
import dumyimg from "../../images/imgdumy.jpg";
import modernimg from "../../images/morderndumy.jpg";
import streetimg from "../../images/streetdumy.jpg";
import casualimg from "../../images/casoueldumy.jpg";
import luxuryimg from "../../images/luxurydumy.jpg";

const OutfitsPreferComp = styled.section`
  padding: 60px 0;
  background-color: #fff;
  overflow: hidden;

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .section-title-container {
    width: 100%;
    max-width: 1200px;
  }

  .style-grid-container {
    width: 100%;
    max-width: 1200px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .section-title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 40px;
  }

  .style-tabs {
    display: flex;
    gap: 32px;
    margin-bottom: 40px;
  }

  .tab-button {
    padding: 0;
    width: 100px;
    height: 40px;
    font-size: 15px;
    cursor: pointer;
    color: #999;
    background-color: rgba(255, 255, 255, 1);
    position: relative;
    border: 1px solid rgba(229, 229, 229, 1);
    border-radius: 32px;

    &.active {
      color: #000;
      font-weight: 500;
    }
  }

  .style-grid {
    display: flex;
    gap: 24px;
    position: relative;
    transition: transform 0.5s ease;
  }

  .carousel-nav {
    position: absolute;
    top: 70%;
    transform: translateY(-50%);
    width: 100%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 2;
  }

  .nav-button {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #eee;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    font-size: 24px;
    color: #333;
    transition: all 0.3s ease;

    &:hover {
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const OutfitsPrefer = () => {
  const [activeTab, setActiveTab] = useState("minimal");
  const [currentIndex, setCurrentIndex] = useState(0);

  const styleData = {
    minimal: [
      { id: 1, imageUrl: dumyimg, alt: "미니멀 스타일 1" },
      { id: 2, imageUrl: dumyimg, alt: "미니멀 스타일 2" },
      { id: 3, imageUrl: dumyimg, alt: "미니멀 스타일 3" },
      { id: 4, imageUrl: dumyimg, alt: "미니멀 스타일 4" },
      { id: 5, imageUrl: dumyimg, alt: "미니멀 스타일 5" },
    ],
    modern: [
      { id: 1, imageUrl: modernimg, alt: "모던 스타일 1" },
      { id: 2, imageUrl: modernimg, alt: "모던 스타일 2" },
      { id: 3, imageUrl: modernimg, alt: "모던 스타일 3" },
      { id: 4, imageUrl: modernimg, alt: "모던 스타일 4" },
      { id: 5, imageUrl: modernimg, alt: "모던 스타일 5" },
    ],
    street: [
      { id: 1, imageUrl: streetimg, alt: "스트릿 스타일 1" },
      { id: 2, imageUrl: streetimg, alt: "스트릿 스타일 2" },
      { id: 3, imageUrl: streetimg, alt: "스트릿 스타일 3" },
      { id: 4, imageUrl: streetimg, alt: "스트릿 스타일 4" },
      { id: 5, imageUrl: streetimg, alt: "스트릿 스타일 5" },
    ],
    casual: [
      { id: 1, imageUrl: casualimg, alt: "캐주얼 스타일 1" },
      { id: 2, imageUrl: casualimg, alt: "캐주얼 스타일 2" },
      { id: 3, imageUrl: casualimg, alt: "캐주얼 스타일 3" },
      { id: 4, imageUrl: casualimg, alt: "캐주얼 스타일 4" },
      { id: 5, imageUrl: casualimg, alt: "캐주얼 스타일 5" },
    ],
    luxury: [
      { id: 1, imageUrl: luxuryimg, alt: "럭셔리 스타일 1" },
      { id: 2, imageUrl: luxuryimg, alt: "럭셔리 스타일 2" },
      { id: 3, imageUrl: luxuryimg, alt: "럭셔리 스타일 3" },
      { id: 4, imageUrl: luxuryimg, alt: "럭셔리 스타일 4" },
      { id: 5, imageUrl: luxuryimg, alt: "럭셔리 스타일 5" },
    ],
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handleCardClick = (id) => {
    console.log(`Clicked card ${id} from ${activeTab} style`);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const maxIndex = styleData[activeTab].length - 5;
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <OutfitsPreferComp>
      <div className="container">
        <div className="section-title-container">
          <h2 className="section-title">취향에 맞는 스타일을 찾아보세요</h2>
          <div className="style-tabs">
            <button
              className={`tab-button ${
                activeTab === "minimal" ? "active" : ""
              }`}
              onClick={() => handleTabClick("minimal")}
            >
              미니멀
            </button>
            <button
              className={`tab-button ${activeTab === "modern" ? "active" : ""}`}
              onClick={() => handleTabClick("modern")}
            >
              모던
            </button>
            <button
              className={`tab-button ${activeTab === "street" ? "active" : ""}`}
              onClick={() => handleTabClick("street")}
            >
              스트릿
            </button>
            <button
              className={`tab-button ${activeTab === "casual" ? "active" : ""}`}
              onClick={() => handleTabClick("casual")}
            >
              캐주얼
            </button>
            <button
              className={`tab-button ${activeTab === "luxury" ? "active" : ""}`}
              onClick={() => handleTabClick("luxury")}
            >
              럭셔리
            </button>
          </div>
        </div>

        <div className="style-grid-container">
          <div
            className="style-grid"
            style={{
              transform: `translateX(-${currentIndex * (280 + 24)}px)`,
            }}
          >
            {styleData[activeTab].map((style) => (
              <OutfitsPreferCard
                key={style.id}
                imageUrl={style.imageUrl}
                alt={style.alt}
                onClick={() => handleCardClick(style.id)}
              />
            ))}
          </div>
          <div className="carousel-nav">
            <button className="nav-button" onClick={handlePrev}>
              ‹
            </button>
            <button className="nav-button" onClick={handleNext}>
              ›
            </button>
          </div>
        </div>
      </div>
    </OutfitsPreferComp>
  );
};

export default OutfitsPrefer;
