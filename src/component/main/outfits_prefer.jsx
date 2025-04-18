import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OutfitsPreferCard from "./OutfitsPreferCard";
import dumyimg from "../../images/imgdumy.jpg";
import modernimg from "../../images/morderndumy.jpg";
import streetimg from "../../images/streetdumy.jpg";
import casualimg from "../../images/casoueldumy.jpg";
import luxuryimg from "../../images/luxurydumy.jpg";
import CoordinateApi from "../../api/CoordinateApi";

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
    font-size: 34px;
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
  const [styleData, setStyleData] = useState({
    minimal: [],
    modern: [],
    street: [],
    casual: [],
    luxury: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API에서 스타일 데이터 가져오기
  const fetchStyleData = async (styleType) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`${styleType} 스타일 데이터 요청 시작`);

      let response;
      try {
        switch (styleType) {
          case "minimal":
            response = await CoordinateApi.getMinimalPreferenceList();
            break;
          case "modern":
            response = await CoordinateApi.getModernPreferenceList();
            break;
          case "street":
            response = await CoordinateApi.getStreetPreferenceList();
            break;
          case "casual":
            response = await CoordinateApi.getCasualPreferenceList();
            break;
          case "luxury":
            response = await CoordinateApi.getLuxuryPreferenceList();
            break;
          default:
            throw new Error("지원하지 않는 스타일 유형입니다.");
        }

        console.log(`${styleType} API 응답:`, response);

        if (!Array.isArray(response)) {
          throw new Error(`${styleType} API 응답 형식이 올바르지 않습니다.`);
        }

        // API 응답 데이터를 컴포넌트에 맞는 형식으로 변환
        const formattedData = response.map((item, index) => {
          const imageUrl =
            item.coordinateImg ||
            item.imageUrl ||
            item.image ||
            item.thumbnailUrl ||
            item.photoUrl ||
            item.url;
          const finalImageUrl = imageUrl || getDefaultImage(styleType);

          return {
            id: item.id || item.coordinateId || index + 1,
            imageUrl: finalImageUrl,
            alt: item.description || `${styleType} 스타일 ${index + 1}`,
            title: item.name || item.title || `${styleType} 스타일`,
            description: item.description || item.desc || "",
          };
        });

        console.log(`${styleType} 변환된 데이터:`, formattedData);

        if (formattedData.length > 0) {
          setStyleData((prev) => ({
            ...prev,
            [styleType]: formattedData,
          }));
        } else {
          setStyleData((prev) => ({
            ...prev,
            [styleType]: getDefaultStyleData(styleType),
          }));
        }
      } catch (apiError) {
        console.error(`${styleType} API 호출 실패:`, apiError);
        throw apiError;
      }
    } catch (err) {
      console.error(`${styleType} 스타일 데이터 로드 실패:`, err);
      setError(`${styleType} 스타일 데이터를 불러오는 중 오류가 발생했습니다.`);

      setStyleData((prev) => ({
        ...prev,
        [styleType]: getDefaultStyleData(styleType),
      }));
    } finally {
      setLoading(false);
    }
  };

  // 기본 스타일 데이터 반환 함수도 5개로 제한
  const getDefaultStyleData = (styleType) => {
    const defaultData = {
      minimal: Array(5)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          imageUrl: dumyimg,
          alt: `미니멀 스타일 ${i + 1}`,
        })),
      modern: Array(5)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          imageUrl: modernimg,
          alt: `모던 스타일 ${i + 1}`,
        })),
      street: Array(5)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          imageUrl: streetimg,
          alt: `스트릿 스타일 ${i + 1}`,
        })),
      casual: Array(5)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          imageUrl: casualimg,
          alt: `캐주얼 스타일 ${i + 1}`,
        })),
      luxury: Array(5)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          imageUrl: luxuryimg,
          alt: `럭셔리 스타일 ${i + 1}`,
        })),
    };

    return (
      defaultData[styleType] ||
      Array(5)
        .fill(null)
        .map((_, i) => ({
          id: i + 1,
          imageUrl: dumyimg,
          alt: `기본 스타일 ${i + 1}`,
        }))
    );
  };

  // 기본 이미지 반환 함수
  const getDefaultImage = (styleType) => {
    switch (styleType) {
      case "minimal":
        return dumyimg;
      case "modern":
        return modernimg;
      case "street":
        return streetimg;
      case "casual":
        return casualimg;
      case "luxury":
        return luxuryimg;
      default:
        return dumyimg;
    }
  };

  // 탭 클릭 핸들러
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    fetchStyleData(tab);
  };

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchStyleData(activeTab);
  }, []);

  const handleCardClick = (id) => {
    console.log(`Clicked card ${id} from ${activeTab} style`);
  };

  // 현재 표시할 아이템들을 가져오는 함수
  const getCurrentItems = () => {
    const items = styleData[activeTab];
    const startIndex = currentIndex * 5;
    return items.slice(startIndex, startIndex + 5);
  };

  // 네비게이션 핸들러 수정
  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return Math.max(0, newIndex);
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.floor((styleData[activeTab].length - 1) / 5);
      const newIndex = prev + 1;
      return Math.min(maxIndex, newIndex);
    });
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
          {loading ? (
            <div className="loading">스타일 데이터를 불러오는 중입니다...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <div className="style-grid">
                {getCurrentItems().map((style) => (
                  <OutfitsPreferCard
                    key={style.id}
                    imageUrl={style.imageUrl}
                    alt={style.alt}
                    onClick={() => handleCardClick(style.id)}
                  />
                ))}
              </div>
              <div className="carousel-nav">
                <button
                  className="nav-button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  ‹
                </button>
                <button
                  className="nav-button"
                  onClick={handleNext}
                  disabled={
                    currentIndex >=
                    Math.floor((styleData[activeTab].length - 1) / 5)
                  }
                >
                  ›
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </OutfitsPreferComp>
  );
};

export default OutfitsPrefer;
