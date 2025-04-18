import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OutfitCarousel from "./OutfitCarousel";
import { getCurrentWeatherBasedRandomStyles } from "../../api/WeatherApi";
import { useAuth } from "../../context/AuthContext";

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
    imageUrl: "https://picsum.photos/410/546",
  },
  {
    title: "스카프 코디",
    imageUrl: "https://picsum.photos/410/546",
  },
  {
    title: "부츠 스타일",
    imageUrl: "https://picsum.photos/410/546",
  },
  {
    title: "따뜻한 니트",
    imageUrl: "https://picsum.photos/410/546",
  },
  {
    title: "패딩 점퍼",
    imageUrl: "https://picsum.photos/410/546",
  },
];

const OutfitsRecommend = () => {
  const [outfitData, setOutfitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, userProfile } = useAuth();

  // 스타일 데이터 가져오기
  useEffect(() => {
    const fetchRandomStyles = async () => {
      try {
        console.log("fetchRandomStyles 실행 시도:", {
          isLoggedIn,
          userProfile,
        });

        setLoading(true);
        setError(null);

        // 로그인 상태이고 userProfile이 있는 경우에만 API 호출
        if (isLoggedIn && userProfile?.email) {
          console.log(`API 호출 시작: email=${userProfile.email}`);
          const styles = await getCurrentWeatherBasedRandomStyles(
            userProfile.email
          );
          console.log("API 응답 데이터:", styles);

          if (styles && Array.isArray(styles) && styles.length > 0) {
            // API 응답 데이터를 OutfitCarousel 컴포넌트에 맞는 형식으로 변환
            const formattedStyles = styles.map((style) => {
              // 이미지 URL 확인 및 기본값 설정
              const imageUrl =
                style.imageUrl ||
                style.coordinateImg ||
                style.thumbnailUrl ||
                style.photoUrl ||
                style.url ||
                "https://picsum.photos/410/546";

              return {
                title: style.name || style.title || "스타일 추천",
                imageUrl: imageUrl,
                id:
                  style.id ||
                  style.coordinateId ||
                  Math.random().toString(36).substr(2, 9),
                description: style.description || style.desc || "",
                weatherCondition: style.weatherCondition || style.weather || "",
              };
            });

            console.log("변환된 스타일 데이터:", formattedStyles);
            setOutfitData(formattedStyles);
          } else {
            console.log(
              "API 응답에 유효한 스타일 데이터가 없습니다. 기본 데이터를 사용합니다."
            );
            setOutfitData(defaultOutfitData);
          }
        } else {
          console.log("API 호출 조건 불충족:", {
            isLoggedIn,
            email: userProfile?.email,
            reason: !isLoggedIn ? "로그인되지 않음" : "유효하지 않은 이메일",
          });
          setOutfitData(defaultOutfitData);
        }

        setLoading(false);
      } catch (err) {
        console.error("스타일 추천을 가져오는 중 오류 발생:", err);
        setError(
          "스타일 추천을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        setOutfitData(defaultOutfitData);
        setLoading(false);
      }
    };

    // 로그인 상태와 userProfile이 모두 유효한 경우에만 실행
    if (isLoggedIn && userProfile?.email) {
      console.log("fetchRandomStyles 실행 조건 충족");
      fetchRandomStyles();
    } else {
      console.log("fetchRandomStyles 실행 조건 불충족:", {
        isLoggedIn,
        email: userProfile?.email,
      });
      setOutfitData(defaultOutfitData);
      setLoading(false);
    }
  }, [isLoggedIn, userProfile]);

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
