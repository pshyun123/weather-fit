import React, { useState, useEffect } from "react";
import {
  StyleSection,
  TabContainer,
  TabItem,
  ContentContainer,
  SelectContainer,
  DetailContainer,
  StyleButton,
  GridBox,
  PaginationContainer,
  PageButton,
  PageArrow,
} from "./MypageStyle.jsx";
import likeIcon from "../../images/heart_button.png";
import likeClickedIcon from "../../images/heart_click_button.png";
import UserApi from "../../api/UserApi";
import Common from "../../utils/Common";

const StyleGrid = () => {
  // 날씨별 데이터를 저장할 상태 추가
  const [weatherStyles, setWeatherStyles] = useState([]);

  // 스타일별 데이터를 저장할 상태 추가
  const [minimalStyles, setMinimalStyles] = useState([]);
  const [modernStyles, setModernStyles] = useState([]);
  const [casualStyles, setCasualStyles] = useState([]);
  const [streetStyles, setStreetStyles] = useState([]);
  const [livelyStyles, setLivelyStyles] = useState([]);
  const [luxuryStyles, setLuxuryStyles] = useState([]);

  // 상황별 데이터를 저장할 상태 추가
  const [situationStyles, setSituationStyles] = useState([]);

  // 좋아요 상태를 저장할 상태 추가
  const [likedItems, setLikedItems] = useState({});

  // 미니멀 스타일 좋아요 아이템만 표시하는 상태 추가
  const [showOnlyMinimalLikes, setShowOnlyMinimalLikes] = useState(false);

  // 데이터 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  // 현재 로그인한 사용자 ID (실제 구현 시 로그인 상태에서 가져와야 함)
  const [userId, setUserId] = useState(1); // 임시 사용자 ID

  const [activeTab, setActiveTab] = useState(1); // 기본적으로 "스타일별" 탭 활성화
  const [activeDetails, setActiveDetails] = useState([]);
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 5*3 그리드

  // 날씨별 데이터 로드 함수
  const fetchWeatherData = async (detailsToUse = activeDetails) => {
    try {
      setIsLoading(true);
      console.log("날씨별 데이터 로드 시작");
      console.log("사용할 날씨 세부 항목:", detailsToUse);

      // 선택된 날씨 세부 항목이 있으면 해당 날씨만 로드
      if (detailsToUse.length > 0) {
        const selectedWeather = detailsToUse[0];
        console.log("선택된 날씨:", selectedWeather);
        switch (selectedWeather) {
          case "맑음":
            try {
              const hotLikes = await UserApi.getHotLikes(userId);
              console.log("더움 날씨 좋아요 데이터:", hotLikes);
              setWeatherStyles(hotLikes || []);

              // 좋아요 상태 업데이트
              if (hotLikes && hotLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                hotLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("더움 날씨 좋아요 데이터 로드 실패:", error);
              setWeatherStyles([
                { id: 101, styleName: "맑은 날 스타일 1", imageUrl: null },
                { id: 102, styleName: "맑은 날 스타일 2", imageUrl: null },
              ]);
            }
            break;
          case "비":
            try {
              const rainLikes = await UserApi.getRainLikes(userId);
              console.log("비 날씨 좋아요 데이터:", rainLikes);
              setWeatherStyles(rainLikes || []);

              // 좋아요 상태 업데이트
              if (rainLikes && rainLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                rainLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("비 날씨 좋아요 데이터 로드 실패:", error);
              setWeatherStyles([
                { id: 103, styleName: "비 오는 날 스타일 1", imageUrl: null },
                { id: 104, styleName: "비 오는 날 스타일 2", imageUrl: null },
              ]);
            }
            break;
          case "눈":
            try {
              const snowLikes = await UserApi.getSnowLikes(userId);
              console.log("눈 날씨 좋아요 데이터:", snowLikes);
              setWeatherStyles(snowLikes || []);

              // 좋아요 상태 업데이트
              if (snowLikes && snowLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                snowLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("눈 날씨 좋아요 데이터 로드 실패:", error);
              setWeatherStyles([
                { id: 105, styleName: "눈 오는 날 스타일 1", imageUrl: null },
                { id: 106, styleName: "눈 오는 날 스타일 2", imageUrl: null },
              ]);
            }
            break;
          case "흐림":
            try {
              const coldLikes = await UserApi.getColdLikes(userId);
              console.log("추운 날씨 좋아요 데이터:", coldLikes);
              setWeatherStyles(coldLikes || []);

              // 좋아요 상태 업데이트
              if (coldLikes && coldLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                coldLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("추운 날씨 좋아요 데이터 로드 실패:", error);
              setWeatherStyles([
                { id: 107, styleName: "흐린 날 스타일 1", imageUrl: null },
                { id: 108, styleName: "흐린 날 스타일 2", imageUrl: null },
              ]);
            }
            break;
          case "바람":
            try {
              const chillLikes = await UserApi.getChillLikes(userId);
              console.log("매우 추운 날씨 좋아요 데이터:", chillLikes);
              setWeatherStyles(chillLikes || []);

              // 좋아요 상태 업데이트
              if (chillLikes && chillLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                chillLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("매우 추운 날씨 좋아요 데이터 로드 실패:", error);
              setWeatherStyles([
                { id: 109, styleName: "바람 부는 날 스타일 1", imageUrl: null },
                { id: 110, styleName: "바람 부는 날 스타일 2", imageUrl: null },
              ]);
            }
            break;
          case "더움":
            try {
              const warmLikes = await UserApi.getWarmLikes(userId);
              console.log("따뜻한 날씨 좋아요 데이터:", warmLikes);
              setWeatherStyles(warmLikes || []);

              // 좋아요 상태 업데이트
              if (warmLikes && warmLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                warmLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("따뜻한 날씨 좋아요 데이터 로드 실패:", error);
              setWeatherStyles([
                { id: 111, styleName: "더운 날 스타일 1", imageUrl: null },
                { id: 112, styleName: "더운 날 스타일 2", imageUrl: null },
              ]);
            }
            break;
          default:
            break;
        }
      } else {
        // 세부 항목이 선택되지 않은 경우 모든 날씨 데이터 로드
        console.log("모든 날씨 데이터 로드");
        try {
          // 모든 날씨 데이터를 합쳐서 표시
          const allWeatherData = [];

          // 각 날씨별 데이터 로드
          const hotLikes = await UserApi.getHotLikes(userId);
          const rainLikes = await UserApi.getRainLikes(userId);
          const snowLikes = await UserApi.getSnowLikes(userId);
          const coldLikes = await UserApi.getColdLikes(userId);
          const chillLikes = await UserApi.getChillLikes(userId);
          const warmLikes = await UserApi.getWarmLikes(userId);

          // 데이터 합치기
          if (hotLikes && hotLikes.length > 0) allWeatherData.push(...hotLikes);
          if (rainLikes && rainLikes.length > 0)
            allWeatherData.push(...rainLikes);
          if (snowLikes && snowLikes.length > 0)
            allWeatherData.push(...snowLikes);
          if (coldLikes && coldLikes.length > 0)
            allWeatherData.push(...coldLikes);
          if (chillLikes && chillLikes.length > 0)
            allWeatherData.push(...chillLikes);
          if (warmLikes && warmLikes.length > 0)
            allWeatherData.push(...warmLikes);

          console.log("모든 날씨 데이터:", allWeatherData);
          setWeatherStyles(allWeatherData);

          // 좋아요 상태 업데이트
          if (allWeatherData.length > 0) {
            const likedItemsMap = { ...likedItems };
            allWeatherData.forEach((item, index) => {
              if (typeof item !== "string" && (item.id || item.coordinateId)) {
                likedItemsMap[index] = true;
              }
            });
            setLikedItems(likedItemsMap);
          }
        } catch (error) {
          console.error("모든 날씨 데이터 로드 실패:", error);
          // 임시 데이터 설정
          setWeatherStyles([
            { id: 101, styleName: "맑은 날 스타일 1", imageUrl: null },
            { id: 102, styleName: "맑은 날 스타일 2", imageUrl: null },
            { id: 103, styleName: "비 오는 날 스타일 1", imageUrl: null },
            { id: 104, styleName: "비 오는 날 스타일 2", imageUrl: null },
            { id: 105, styleName: "눈 오는 날 스타일 1", imageUrl: null },
            { id: 106, styleName: "눈 오는 날 스타일 2", imageUrl: null },
          ]);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("날씨별 데이터 로드 실패:", error);
      setIsLoading(false);
    }
  };

  // 스타일별 데이터 로드 함수
  const fetchStyleData = async (detailsToUse = activeDetails) => {
    try {
      setIsLoading(true);
      console.log("스타일별 데이터 로드 시작");
      console.log("사용할 스타일 세부 항목:", detailsToUse);

      // 선택된 스타일이 있으면 해당 스타일만 로드
      if (detailsToUse.length > 0) {
        const selectedStyle = detailsToUse[0].toLowerCase();
        console.log("선택된 스타일:", selectedStyle);
        switch (selectedStyle) {
          case "미니멀":
            // 미니멀 스타일은 좋아요 목록만 가져오기
            if (userId) {
              const minimalLikes = await UserApi.getMinimalLikes(userId);
              console.log("미니멀 스타일 좋아요 데이터:", minimalLikes);
              setMinimalStyles(minimalLikes || []);

              // 좋아요 상태 업데이트
              if (minimalLikes && minimalLikes.length > 0) {
                const likedItemsMap = { ...likedItems };

                // 미니멀 스타일 아이템은 모두 좋아요 상태로 표시
                minimalLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });

                setLikedItems(likedItemsMap);
                console.log(
                  "미니멀 스타일 좋아요 상태 업데이트 완료:",
                  likedItemsMap
                );
              }
            }
            break;
          case "모던":
            // 모던 스타일은 좋아요 목록만 가져오기
            if (userId) {
              const modernLikes = await UserApi.getModernLikes(userId);
              console.log("모던 스타일 좋아요 데이터:", modernLikes);
              setModernStyles(modernLikes || []);

              // 좋아요 상태 업데이트
              if (modernLikes && modernLikes.length > 0) {
                const likedItemsMap = { ...likedItems };

                // 모던 스타일 아이템은 모두 좋아요 상태로 표시
                modernLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });

                setLikedItems(likedItemsMap);
                console.log(
                  "모던 스타일 좋아요 상태 업데이트 완료:",
                  likedItemsMap
                );
              }
            }
            break;
          case "캐주얼":
            // 캐주얼 스타일은 좋아요 목록만 가져오기
            if (userId) {
              const casualLikes = await UserApi.getCasualLikes(userId);
              console.log("캐주얼 스타일 좋아요 데이터:", casualLikes);
              setCasualStyles(casualLikes || []);

              // 좋아요 상태 업데이트
              if (casualLikes && casualLikes.length > 0) {
                const likedItemsMap = { ...likedItems };

                // 캐주얼 스타일 아이템은 모두 좋아요 상태로 표시
                casualLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });

                setLikedItems(likedItemsMap);
                console.log(
                  "캐주얼 스타일 좋아요 상태 업데이트 완료:",
                  likedItemsMap
                );
              }
            }

            break;
          case "스트릿":
            // 스트릿 스타일은 좋아요 목록만 가져오기
            if (userId) {
              const streetLikes = await UserApi.getStreetLikes(userId);
              console.log("스트릿 스타일 좋아요 데이터:", streetLikes);
              setStreetStyles(streetLikes || []);

              // 좋아요 상태 업데이트
              if (streetLikes && streetLikes.length > 0) {
                const likedItemsMap = { ...likedItems };

                // 스트릿 스타일 아이템은 모두 좋아요 상태로 표시
                streetLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });

                setLikedItems(likedItemsMap);
                console.log(
                  "스트릿 스타일 좋아요 상태 업데이트 완료:",
                  likedItemsMap
                );
              }
            }
            break;

          case "러블리":
            // 러블리 스타일은 좋아요 목록만 가져오기
            if (userId) {
              const livelyLikes = await UserApi.getLivelyLikes(userId);
              console.log("러블리 스타일 좋아요 데이터:", livelyLikes);
              setLivelyStyles(livelyLikes || []);

              // 좋아요 상태 업데이트
              if (livelyLikes && livelyLikes.length > 0) {
                const likedItemsMap = { ...likedItems };

                // 러블리 스타일 아이템은 모두 좋아요 상태로 표시
                livelyLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });

                setLikedItems(likedItemsMap);
                console.log(
                  "러블리 스타일 좋아요 상태 업데이트 완료:",
                  likedItemsMap
                );
              }
            }
            break;
          case "럭셔리":
            // 럭셔리 스타일은 좋아요 목록만 가져오기
            if (userId) {
              const luxuryLikes = await UserApi.getLuxuryLikes(userId);
              console.log("럭셔리 스타일 좋아요 데이터:", luxuryLikes);
              setLuxuryStyles(luxuryLikes || []);

              // 좋아요 상태 업데이트
              if (luxuryLikes && luxuryLikes.length > 0) {
                const likedItemsMap = { ...likedItems };

                // 럭셔리 스타일 아이템은 모두 좋아요 상태로 표시
                luxuryLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });

                setLikedItems(likedItemsMap);
                console.log(
                  "럭셔리 스타일 좋아요 상태 업데이트 완료:",
                  likedItemsMap
                );
              }
            }

            break;
          default:
            break;
        }
      } else {
        // 세부 항목이 선택되지 않은 경우 모든 스타일 데이터 로드
        console.log("모든 스타일 데이터 로드");
        try {
          // 각 스타일별 데이터 로드 - 항상 새로 로드하도록 수정
          const minimalLikes = await UserApi.getMinimalLikes(userId);
          setMinimalStyles(minimalLikes || []);

          const modernLikes = await UserApi.getModernLikes(userId);
          setModernStyles(modernLikes || []);

          const casualLikes = await UserApi.getCasualLikes(userId);
          setCasualStyles(casualLikes || []);

          const streetLikes = await UserApi.getStreetLikes(userId);
          setStreetStyles(streetLikes || []);

          const livelyLikes = await UserApi.getLivelyLikes(userId);
          setLivelyStyles(livelyLikes || []);

          const luxuryLikes = await UserApi.getLuxuryLikes(userId);
          setLuxuryStyles(luxuryLikes || []);

          // 모든 스타일 데이터 합치기
          const allStyleData = [
            ...(minimalLikes || []),
            ...(modernLikes || []),
            ...(casualLikes || []),
            ...(streetLikes || []),
            ...(livelyLikes || []),
            ...(luxuryLikes || []),
          ];

          console.log("모든 스타일 데이터:", allStyleData);

          // 좋아요 상태 업데이트
          if (allStyleData.length > 0) {
            const likedItemsMap = { ...likedItems };
            allStyleData.forEach((item, index) => {
              if (typeof item !== "string" && (item.id || item.coordinateId)) {
                likedItemsMap[index] = true;
              }
            });
            setLikedItems(likedItemsMap);
          }
        } catch (error) {
          console.error("모든 스타일 데이터 로드 실패:", error);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("스타일별 데이터 로드 실패:", error);
      setIsLoading(false);
    }
  };

  // 상황별 데이터 로드 함수
  const fetchSituationData = async (detailsToUse = activeDetails) => {
    try {
      setIsLoading(true);
      console.log("상황별 데이터 로드 시작");
      console.log("사용할 상황 세부 항목:", detailsToUse);

      // 선택된 상황 세부 항목이 있으면 해당 상황만 로드
      if (detailsToUse.length > 0) {
        const selectedSituation = detailsToUse[0];
        console.log("선택된 상황:", selectedSituation);
        switch (selectedSituation) {
          case "데이트":
            try {
              const dateLikes = await UserApi.getDateLikes(userId);
              console.log("데이트 TPO 좋아요 데이터:", dateLikes);
              setSituationStyles(dateLikes || []);

              // 좋아요 상태 업데이트
              if (dateLikes && dateLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                dateLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("데이트 TPO 좋아요 데이터 로드 실패:", error);
              setSituationStyles([
                { id: 201, styleName: "데이트 룩 1", imageUrl: null },
                { id: 202, styleName: "데이트 룩 2", imageUrl: null },
              ]);
            }
            break;
          case "출근":
            try {
              const workLikes = await UserApi.getWorkLikes(userId);
              console.log("출근 TPO 좋아요 데이터:", workLikes);
              setSituationStyles(workLikes || []);

              // 좋아요 상태 업데이트
              if (workLikes && workLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                workLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("출근 TPO 좋아요 데이터 로드 실패:", error);
              setSituationStyles([
                { id: 203, styleName: "출근 룩 1", imageUrl: null },
                { id: 204, styleName: "출근 룩 2", imageUrl: null },
              ]);
            }
            break;
          case "여행":
            try {
              const travelLikes = await UserApi.getTravelLikes(userId);
              console.log("여행 TPO 좋아요 데이터:", travelLikes);
              setSituationStyles(travelLikes || []);

              // 좋아요 상태 업데이트
              if (travelLikes && travelLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                travelLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("여행 TPO 좋아요 데이터 로드 실패:", error);
              setSituationStyles([
                { id: 205, styleName: "여행 룩 1", imageUrl: null },
                { id: 206, styleName: "여행 룩 2", imageUrl: null },
              ]);
            }
            break;
          case "운동":
            try {
              const exerciseLikes = await UserApi.getExerciseLikes(userId);
              console.log("운동 TPO 좋아요 데이터:", exerciseLikes);
              setSituationStyles(exerciseLikes || []);

              // 좋아요 상태 업데이트
              if (exerciseLikes && exerciseLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                exerciseLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("운동 TPO 좋아요 데이터 로드 실패:", error);
              setSituationStyles([
                { id: 207, styleName: "운동 룩 1", imageUrl: null },
                { id: 208, styleName: "운동 룩 2", imageUrl: null },
              ]);
            }
            break;
          case "모임":
            try {
              const meetingLikes = await UserApi.getMeetingLikes(userId);
              console.log("모임 TPO 좋아요 데이터:", meetingLikes);
              setSituationStyles(meetingLikes || []);

              // 좋아요 상태 업데이트
              if (meetingLikes && meetingLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                meetingLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("모임 TPO 좋아요 데이터 로드 실패:", error);
              setSituationStyles([
                { id: 209, styleName: "모임 룩 1", imageUrl: null },
                { id: 210, styleName: "모임 룩 2", imageUrl: null },
              ]);
            }
            break;
          case "일상":
            try {
              const dailyLikes = await UserApi.getDailyLikes(userId);
              console.log("일상 TPO 좋아요 데이터:", dailyLikes);
              setSituationStyles(dailyLikes || []);

              // 좋아요 상태 업데이트
              if (dailyLikes && dailyLikes.length > 0) {
                const likedItemsMap = { ...likedItems };
                dailyLikes.forEach((item, index) => {
                  if (
                    typeof item !== "string" &&
                    (item.id || item.coordinateId)
                  ) {
                    likedItemsMap[index] = true;
                  }
                });
                setLikedItems(likedItemsMap);
              }
            } catch (error) {
              console.error("일상 TPO 좋아요 데이터 로드 실패:", error);
              setSituationStyles([
                { id: 211, styleName: "일상 룩 1", imageUrl: null },
                { id: 212, styleName: "일상 룩 2", imageUrl: null },
              ]);
            }
            break;
          default:
            break;
        }
      } else {
        // 세부 항목이 선택되지 않은 경우 모든 상황 데이터 로드
        console.log("모든 상황 데이터 로드");
        try {
          // 모든 상황 데이터를 합쳐서 표시
          const allSituationData = [];

          // 각 상황별 데이터 로드
          const dateLikes = await UserApi.getDateLikes(userId);
          const workLikes = await UserApi.getWorkLikes(userId);
          const travelLikes = await UserApi.getTravelLikes(userId);
          const exerciseLikes = await UserApi.getExerciseLikes(userId);
          const meetingLikes = await UserApi.getMeetingLikes(userId);
          const dailyLikes = await UserApi.getDailyLikes(userId);

          // 데이터 합치기
          if (dateLikes && dateLikes.length > 0)
            allSituationData.push(...dateLikes);
          if (workLikes && workLikes.length > 0)
            allSituationData.push(...workLikes);
          if (travelLikes && travelLikes.length > 0)
            allSituationData.push(...travelLikes);
          if (exerciseLikes && exerciseLikes.length > 0)
            allSituationData.push(...exerciseLikes);
          if (meetingLikes && meetingLikes.length > 0)
            allSituationData.push(...meetingLikes);
          if (dailyLikes && dailyLikes.length > 0)
            allSituationData.push(...dailyLikes);

          console.log("모든 상황 데이터:", allSituationData);
          setSituationStyles(allSituationData);

          // 좋아요 상태 업데이트
          if (allSituationData.length > 0) {
            const likedItemsMap = { ...likedItems };
            allSituationData.forEach((item, index) => {
              if (typeof item !== "string" && (item.id || item.coordinateId)) {
                likedItemsMap[index] = true;
              }
            });
            setLikedItems(likedItemsMap);
          }
        } catch (error) {
          console.error("모든 상황 데이터 로드 실패:", error);
          // 임시 데이터 설정
          setSituationStyles([
            { id: 201, styleName: "데이트 룩 1", imageUrl: null },
            { id: 202, styleName: "데이트 룩 2", imageUrl: null },
            { id: 203, styleName: "출근 룩 1", imageUrl: null },
            { id: 204, styleName: "출근 룩 2", imageUrl: null },
            { id: 205, styleName: "여행 룩 1", imageUrl: null },
            { id: 206, styleName: "여행 룩 2", imageUrl: null },
          ]);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("상황별 데이터 로드 실패:", error);
      setIsLoading(false);
    }
  };

  // 탭 변경 시 해당 탭의 데이터 로드
  useEffect(() => {
    setActiveDetails([]);
    setCurrentPage(1);
    setSelectedGridItem(null);
    setShowOnlyMinimalLikes(false); // 탭 변경 시 필터 초기화

    switch (activeTab) {
      case 0: // 날씨별
        fetchWeatherData([]);
        break;
      case 1: // 스타일별
        fetchStyleData([]);
        break;
      case 2: // 상황별
        fetchSituationData([]);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // 스타일별 탭에서 세부 스타일 선택 시 해당 데이터 로드
  useEffect(() => {
    if (activeTab === 1) {
      if (activeDetails.length > 0) {
        fetchStyleData();
        setShowOnlyMinimalLikes(false); // 스타일 변경 시 필터 초기화
      } else {
        // 세부 항목이 선택 해제되면 모든 스타일 데이터 로드
        fetchStyleData([]);
        setShowOnlyMinimalLikes(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDetails, activeTab]);

  // 날씨별 탭에서 세부 날씨 선택 시 해당 데이터 로드
  useEffect(() => {
    if (activeTab === 0) {
      if (activeDetails.length > 0) {
        fetchWeatherData();
      } else {
        // 세부 항목이 선택 해제되면 모든 날씨 데이터 로드
        fetchWeatherData([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDetails, activeTab]);

  // 상황별 탭에서 세부 상황 선택 시 해당 데이터 로드
  useEffect(() => {
    if (activeTab === 2) {
      if (activeDetails.length > 0) {
        fetchSituationData();
      } else {
        // 세부 항목이 선택 해제되면 모든 상황 데이터 로드
        fetchSituationData([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDetails, activeTab]);

  // 각 카테고리에 대한 데이터 정의
  const styleCategories = [
    {
      title: "날씨별",
      content: "날씨별 스타일 콘텐츠가 여기에 표시됩니다.",
      details: ["맑음", "비", "눈", "흐림", "바람", "더움"],
      getItems: () => {
        console.log("날씨별 getItems 호출됨, 데이터:", weatherStyles);
        return weatherStyles.length > 0
          ? weatherStyles
          : ["날씨별 스타일 로딩 중..."];
      },
    },
    {
      title: "스타일별",
      content: "스타일별 콘텐츠가 여기에 표시됩니다.",
      details: ["미니멀", "모던", "캐주얼", "스트릿", "러블리", "럭셔리"],
      getItems: () => {
        console.log("스타일별 getItems 호출됨");
        // 선택된 스타일에 따라 다른 데이터 반환
        if (activeDetails.length > 0) {
          const selectedStyle = activeDetails[0];
          console.log("선택된 스타일:", selectedStyle);
          switch (selectedStyle) {
            case "미니멀":
              console.log("미니멀 스타일 데이터:", minimalStyles);
              return minimalStyles.length > 0
                ? minimalStyles
                : ["미니멀 스타일 로딩 중..."];
            case "모던":
              console.log("모던 스타일 데이터:", modernStyles);
              return modernStyles.length > 0
                ? modernStyles
                : ["모던 스타일 로딩 중..."];
            case "캐주얼":
              console.log("캐주얼 스타일 데이터:", casualStyles);
              return casualStyles.length > 0
                ? casualStyles
                : ["캐주얼 스타일 로딩 중..."];
            case "스트릿":
              console.log("스트릿 스타일 데이터:", streetStyles);
              return streetStyles.length > 0
                ? streetStyles
                : ["스트릿 스타일 로딩 중..."];
            case "러블리":
              console.log("러블리 스타일 데이터:", livelyStyles);
              return livelyStyles.length > 0
                ? livelyStyles
                : ["러블리 스타일 로딩 중..."];
            case "럭셔리":
              console.log("럭셔리 스타일 데이터:", luxuryStyles);
              return luxuryStyles.length > 0
                ? luxuryStyles
                : ["럭셔리 스타일 로딩 중..."];
            default:
              return ["스타일 데이터 로딩 중..."];
          }
        } else {
          // 세부 항목이 선택되지 않은 경우 모든 스타일 데이터 합쳐서 반환
          console.log("모든 스타일 데이터 합쳐서 반환");
          const allStyleData = [
            ...(minimalStyles || []),
            ...(modernStyles || []),
            ...(casualStyles || []),
            ...(streetStyles || []),
            ...(livelyStyles || []),
            ...(luxuryStyles || []),
          ];
          console.log("합쳐진 스타일 데이터:", allStyleData);
          return allStyleData.length > 0
            ? allStyleData
            : ["스타일 데이터 로딩 중..."];
        }
      },
    },
    {
      title: "상황별",
      content: "상황별 콘텐츠가 여기에 표시됩니다.",
      details: ["데이트", "출근", "여행", "운동", "모임", "일상"],
      getItems: () => {
        console.log("상황별 getItems 호출됨, 데이터:", situationStyles);
        return situationStyles.length > 0
          ? situationStyles
          : ["상황별 스타일 로딩 중..."];
      },
    },
  ];

  const toggleDetail = (detail) => {
    console.log("toggleDetail 호출됨, 선택된 세부 항목:", detail);

    if (activeDetails.includes(detail)) {
      // 이미 선택된 버튼을 다시 클릭하면 선택 해제
      console.log("세부 항목 선택 해제");
      setActiveDetails([]);

      // 선택 해제 시 해당 탭의 모든 데이터 로드
      switch (activeTab) {
        case 0: // 날씨별
          console.log("날씨별 모든 데이터 로드");
          fetchWeatherData([]);
          break;
        case 1: // 스타일별
          console.log("스타일별 모든 데이터 로드");
          fetchStyleData([]);
          break;
        case 2: // 상황별
          console.log("상황별 모든 데이터 로드");
          fetchSituationData([]);
          break;
        default:
          break;
      }
    } else {
      // 새로운 버튼을 클릭하면 이전 선택을 모두 해제하고 새 버튼만 선택
      console.log("새 세부 항목 선택:", detail);
      const newDetails = [detail];
      setActiveDetails(newDetails);

      // 선택된 탭에 따라 즉시 데이터 로드
      switch (activeTab) {
        case 0: // 날씨별
          console.log("날씨별 데이터 즉시 로드");
          fetchWeatherData(newDetails);
          break;
        case 1: // 스타일별
          console.log("스타일별 데이터 즉시 로드");
          fetchStyleData(newDetails);
          break;
        case 2: // 상황별
          console.log("상황별 데이터 즉시 로드");
          fetchSituationData(newDetails);
          break;
        default:
          break;
      }
    }
  };

  const handleGridItemClick = (index) => {
    setSelectedGridItem(index === selectedGridItem ? null : index);
  };

  // 현재 선택된 탭과 세부 항목에 따라 그리드 아이템 필터링
  const getFilteredGridItems = () => {
    console.log(
      "getFilteredGridItems 호출됨, activeTab:",
      activeTab,
      "activeDetails:",
      activeDetails
    );
    const category = styleCategories[activeTab];

    if (!category) return [];

    // 세부 항목이 선택되지 않은 경우
    if (activeDetails.length === 0) {
      console.log("세부 항목 선택되지 않음, 카테고리 전체 데이터 반환");
      return category.getItems();
    }

    // 세부 항목이 선택된 경우
    console.log("세부 항목 선택됨:", activeDetails[0]);
    switch (activeTab) {
      case 0: // 날씨별
        return weatherStyles.length > 0
          ? weatherStyles
          : ["날씨별 스타일 로딩 중..."];
      case 1: // 스타일별
        return category.getItems();
      case 2: // 상황별
        return situationStyles.length > 0
          ? situationStyles
          : ["상황별 스타일 로딩 중..."];
      default:
        return [];
    }
  };

  // 현재 페이지에 표시할 아이템 가져오기
  const getCurrentPageItems = () => {
    const filteredItems = getFilteredGridItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredItems.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    console.log("현재 활성 탭:", activeTab, styleCategories[activeTab].title);
    console.log("현재 선택된 세부 항목:", activeDetails);
    console.log("현재 페이지 아이템:", pageItems);
    return pageItems;
  };

  // 이미지 URL 생성 함수
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // 이미지 경로가 전체 URL인 경우
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // 상대 경로인 경우 서버 URL과 결합
    return `${Common.WWEATHERFIT}${
      imagePath.startsWith("/") ? "" : "/"
    }${imagePath}`;
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(getFilteredGridItems().length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedGridItem(null); // 페이지 변경 시 선택된 아이템 초기화
  };

  // 페이지 버튼 렌더링
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // 이전 페이지 버튼
    buttons.push(
      <PageArrow
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PageArrow>
    );

    // 페이지 번호 버튼
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          $active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // 다음 페이지 버튼
    buttons.push(
      <PageArrow
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PageArrow>
    );

    return buttons;
  };

  // 좋아요 토글 함수
  const toggleLike = async (itemId, e) => {
    e.stopPropagation(); // 그리드 아이템 클릭 이벤트 전파 방지

    try {
      const item = getCurrentPageItems()[itemId];

      // 아이템이 문자열인 경우(로딩 중이거나 임시 데이터) API 호출 생략
      if (typeof item === "string") {
        console.log("문자열 아이템은 좋아요 기능을 지원하지 않습니다.");
        return;
      }

      // 착장 ID 가져오기 (API 응답 구조에 따라 다른 필드명 사용 가능)
      const coordinateId = item.id || item.coordinateId; // 착장 ID

      if (!coordinateId) {
        console.error("착장 ID가 없습니다:", item);
        return;
      }

      // 좋아요 상태 토글
      const newLikedState = !likedItems[itemId];

      // 좋아요 상태에 따라 API 호출
      if (newLikedState) {
        // 좋아요 추가
        await UserApi.addLike(userId, coordinateId);
        console.log(`아이템 ${coordinateId} 좋아요 추가 성공`);
      } else {
        // 좋아요 삭제
        await UserApi.deleteLike(userId, coordinateId);
        console.log(`아이템 ${coordinateId} 좋아요 삭제 성공`);
      }

      // 상태 업데이트
      setLikedItems((prev) => ({
        ...prev,
        [itemId]: newLikedState,
      }));
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
      // 오류 발생 시 사용자에게 알림 표시 (선택 사항)
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <StyleSection>
      <h2>마이 스타일</h2>

      <TabContainer>
        <SelectContainer>
          {styleCategories.map((category, index) => (
            <TabItem
              key={category.title}
              $active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {category.title}
            </TabItem>
          ))}
        </SelectContainer>

        <DetailContainer>
          {styleCategories[activeTab].details.map((detail) => (
            <StyleButton
              key={detail}
              $active={activeDetails.includes(detail)}
              onClick={() => toggleDetail(detail)}
            >
              {detail}
            </StyleButton>
          ))}
        </DetailContainer>
      </TabContainer>

      <ContentContainer>
        {getCurrentPageItems().map((item, index) => (
          <GridBox
            key={index}
            onClick={() => handleGridItemClick(index)}
            style={{
              border:
                selectedGridItem === index
                  ? "2px solid #4981f8"
                  : "1px solid #ddd",
            }}
          >
            {/* 백엔드에서 받아온 데이터 구조에 따라 표시 */}
            {typeof item === "string" ? (
              // 로딩 중이거나 문자열 데이터인 경우
              <div className="grid-image">
                <div style={{ padding: "20px", textAlign: "center" }}>
                  {item}
                </div>
              </div>
            ) : (
              // 객체 데이터인 경우 (백엔드에서 받아온 실제 데이터)
              <>
                <div className="grid-image">
                  {item.coordinateImg || item.imageUrl ? (
                    <img
                      src={getImageUrl(item.coordinateImg || item.imageUrl)}
                      alt={item.preference || item.styleName || "착장 이미지"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        console.error(
                          "이미지 로드 실패:",
                          item.coordinateImg || item.imageUrl
                        );
                        e.target.src =
                          "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      이미지 없음
                    </div>
                  )}
                </div>
              </>
            )}
            <div
              className="grid-like-icon"
              style={{
                position: "absolute",
                top: "120px",
                right: "4px",
                zIndex: 2,
                // backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "50%",
                padding: "4px",
              }}
              onClick={(e) => toggleLike(index, e)}
            >
              <img
                src={likedItems[index] ? likeClickedIcon : likeIcon}
                alt="like"
                style={{ width: "16px", height: "16px" }}
              />
            </div>
          </GridBox>
        ))}
      </ContentContainer>

      {totalPages > 1 && (
        <PaginationContainer>{renderPageButtons()}</PaginationContainer>
      )}
    </StyleSection>
  );
};

export default StyleGrid;
