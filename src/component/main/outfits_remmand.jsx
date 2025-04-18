import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OutfitCarousel from "./OutfitCarousel";
import { getCurrentWeatherBasedRandomStyles } from "../../api/WeatherApi";

const OutfitsRecommendComp = styled.section`
  padding: 60px 0;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  width: 100%;

  .container {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    overflow: hidden;
  }

  .section-title {
    font-size: 36px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 40px;
  }

  .loading {
    text-align: center;
    font-size: 18px;
    color: #666;
    padding: 40px 0;
  }

  .error {
    text-align: center;
    font-size: 18px;
    color: #ff6b6b;
    padding: 40px 0;
  }
`;

// 기본 아웃핏 데이터
const defaultOutfitData = [
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
];

const OutfitsRecommend = () => {
  const [outfitData, setOutfitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // 로그인 상태 확인 - 세션 스토리지에서 확인
  useEffect(() => {
    const checkLoginFromSession = () => {
      try {
        // 세션 스토리지에서 로그인 정보 확인
        const userInfo = sessionStorage.getItem("userInfo");

        if (userInfo) {
          const user = JSON.parse(userInfo);
          setIsLoggedIn(true);
          setUserId(user.id);
          console.log("세션에서 로그인 정보 확인:", user);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
          console.log("세션에 로그인 정보가 없습니다.");
        }
      } catch (err) {
        console.error("세션에서 로그인 정보 확인 중 오류 발생:", err);
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    checkLoginFromSession();
  }, []);

  // 스타일 데이터 가져오기
  useEffect(() => {
    const fetchRandomStyles = async () => {
      try {
        setLoading(true);

        // 로그인 상태이고 userId가 있는 경우에만 API 호출
        if (isLoggedIn && userId) {
          const styles = await getCurrentWeatherBasedRandomStyles(userId);

          // API 응답 데이터를 OutfitCarousel 컴포넌트에 맞는 형식으로 변환
          const formattedStyles = styles.map((style) => ({
            title: style.name || "스타일 추천",
            imageUrl: style.imageUrl || "https://via.placeholder.com/410x546",
            id: style.id,
            description: style.description || "",
            weatherCondition: style.weatherCondition || "",
          }));

          setOutfitData(formattedStyles);
        } else {
          // 로그인하지 않은 경우 기본 데이터 사용
          console.log("로그인되지 않았습니다. 기본 데이터를 사용합니다.");
          setOutfitData(defaultOutfitData);
        }

        setLoading(false);
      } catch (err) {
        console.error("스타일 추천을 가져오는 중 오류 발생:", err);
        setError(
          "스타일 추천을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        setLoading(false);
      }
    };

    // 로그인 상태 확인이 완료된 후에만 데이터 가져오기
    fetchRandomStyles();
  }, [isLoggedIn, userId]);

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return (
      <OutfitsRecommendComp>
        <div className="container">
          <h2 className="section-title">지금 날씨에 이런 옷은 어때요?</h2>
          <div className="loading">스타일 추천을 불러오는 중입니다...</div>
        </div>
      </OutfitsRecommendComp>
    );
  }

  // 에러 발생 시 표시할 내용
  if (error) {
    return (
      <OutfitsRecommendComp>
        <div className="container">
          <h2 className="section-title">지금 날씨에 이런 옷은 어때요?</h2>
          <div className="error">{error}</div>
        </div>
      </OutfitsRecommendComp>
    );
  }

  // 데이터가 없을 경우 기본 데이터 사용
  const displayData = outfitData.length > 0 ? outfitData : defaultOutfitData;

  return (
    <OutfitsRecommendComp>
      <div className="container">
        <h2 className="section-title">지금 날씨에 이런 옷은 어때요?</h2>
        <OutfitCarousel outfits={displayData} />
      </div>
    </OutfitsRecommendComp>
  );
};

export default OutfitsRecommend;
