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
import CoordinateApi from "../../api/CoordinateApi";
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
  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      console.log("날씨별 데이터 로드 시작");
      // 여기에 날씨별 API 호출 추가
      // 예: const weatherData = await CoordinateApi.getWeatherStyleList();
      // setWeatherStyles(weatherData);

      // 임시 데이터 (실제 API 연결 시 대체)
      setTimeout(() => {
        setWeatherStyles([
          "맑은 날 스타일 1",
          "맑은 날 스타일 2",
          "비 오는 날 스타일 1",
          "비 오는 날 스타일 2",
          "눈 오는 날 스타일 1",
          "눈 오는 날 스타일 2",
        ]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("날씨별 데이터 로드 실패:", error);
      setIsLoading(false);
    }
  };

  // 스타일별 데이터 로드 함수
  const fetchStyleData = async () => {
    try {
      setIsLoading(true);
      console.log("스타일별 데이터 로드 시작");

      // 선택된 스타일이 있으면 해당 스타일만 로드
      if (activeDetails.length > 0) {
        const selectedStyle = activeDetails[0].toLowerCase();
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
        // 기본적으로 미니멀 스타일 로드
        if (minimalStyles.length === 0 && userId) {
          const minimalLikes = await UserApi.getMinimalLikes(userId);
          console.log("미니멀 스타일 좋아요 데이터:", minimalLikes);
          setMinimalStyles(minimalLikes || []);

          // 좋아요 상태 업데이트
          if (minimalLikes && minimalLikes.length > 0) {
            const likedItemsMap = { ...likedItems };

            // 미니멀 스타일 아이템은 모두 좋아요 상태로 표시
            minimalLikes.forEach((item, index) => {
              if (typeof item !== "string" && (item.id || item.coordinateId)) {
                likedItemsMap[index] = true;
              }
            });

            setLikedItems(likedItemsMap);
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("스타일별 데이터 로드 실패:", error);
      setIsLoading(false);
    }
  };

  // 상황별 데이터 로드 함수
  const fetchSituationData = async () => {
    try {
      setIsLoading(true);
      console.log("상황별 데이터 로드 시작");
      // 여기에 상황별 API 호출 추가
      // 예: const situationData = await CoordinateApi.getSituationStyleList();
      // setSituationStyles(situationData);

      // 임시 데이터 (실제 API 연결 시 대체)
      setTimeout(() => {
        setSituationStyles([
          "데이트 룩 1",
          "데이트 룩 2",
          "출근 룩 1",
          "출근 룩 2",
          "여행 룩 1",
          "여행 룩 2",
        ]);
        setIsLoading(false);
      }, 500);
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
        fetchWeatherData();
        break;
      case 1: // 스타일별
        fetchStyleData();
        break;
      case 2: // 상황별
        fetchSituationData();
        break;
      default:
        break;
    }
  }, [activeTab]);

  // 스타일별 탭에서 세부 스타일 선택 시 해당 데이터 로드
  useEffect(() => {
    if (activeTab === 1 && activeDetails.length > 0) {
      fetchStyleData();
      setShowOnlyMinimalLikes(false); // 스타일 변경 시 필터 초기화
    }
  }, [activeDetails]);

  // 미니멀 좋아요 필터 토글 함수
  const toggleMinimalLikesFilter = () => {
    // 미니멀 스타일은 이미 좋아요 목록만 표시하므로 필터 토글이 필요 없음
    // 하지만 UI 상태는 유지
    setShowOnlyMinimalLikes(!showOnlyMinimalLikes);
    // 필터 토글 시 페이지 초기화
    setCurrentPage(1);
  };

  // 각 카테고리에 대한 데이터 정의
  const styleCategories = [
    {
      title: "날씨별",
      content: "날씨별 스타일 콘텐츠가 여기에 표시됩니다.",
      details: ["맑음", "비", "눈", "흐림", "바람", "더움"],
      getItems: () => {
        return weatherStyles.length > 0
          ? weatherStyles
          : ["날씨별 스타일 로딩 중..."];
      },
    },
    {
      title: "스타일별",
      content: "스타일별 콘텐츠가 여기에 표시됩니다.",
      details: ["미니멀", "모던", "캐주얼", "스트릿", "러블리", "럭셔리"],
      getItems: (detail) => {
        console.log("선택된 스타일:", detail);
        switch (detail?.toLowerCase()) {
          case "미니멀":
            return minimalStyles.length > 0
              ? minimalStyles
              : ["미니멀 스타일 로딩 중..."];
          case "모던":
            return modernStyles.length > 0
              ? modernStyles
              : ["모던 스타일 로딩 중..."];
          case "캐주얼":
            return casualStyles.length > 0
              ? casualStyles
              : ["캐주얼 스타일 로딩 중..."];
          case "스트릿":
            return streetStyles.length > 0
              ? streetStyles
              : ["스트릿 스타일 로딩 중..."];
          case "러블리":
            return livelyStyles.length > 0
              ? livelyStyles
              : ["러블리 스타일 로딩 중..."];
          case "럭셔리":
            return luxuryStyles.length > 0
              ? luxuryStyles
              : ["럭셔리 스타일 로딩 중..."];
          default:
            return minimalStyles.length > 0
              ? minimalStyles
              : ["스타일 로딩 중..."];
        }
      },
    },
    {
      title: "상황별",
      content: "상황별 콘텐츠가 여기에 표시됩니다.",
      details: ["데이트", "출근", "여행", "운동", "모임", "일상"],
      getItems: () => {
        return situationStyles.length > 0
          ? situationStyles
          : ["상황별 스타일 로딩 중..."];
      },
    },
  ];

  const toggleDetail = (detail) => {
    if (activeDetails.includes(detail)) {
      // 이미 선택된 버튼을 다시 클릭하면 선택 해제
      setActiveDetails([]);
    } else {
      // 새로운 버튼을 클릭하면 이전 선택을 모두 해제하고 새 버튼만 선택
      setActiveDetails([detail]);
    }
  };

  const handleGridItemClick = (index) => {
    setSelectedGridItem(index === selectedGridItem ? null : index);
  };

  // 선택된 스타일에 따라 필터링된 그리드 아이템 가져오기
  const getFilteredGridItems = () => {
    const category = styleCategories[activeTab];

    // 선택된 스타일이 없으면 기본 아이템 표시
    if (activeDetails.length === 0) {
      return category.getItems();
    }

    // 선택된 스타일에 따라 아이템 가져오기
    let items = category.getItems(activeDetails[0]);

    // 미니멀 스타일은 이미 좋아요 목록만 표시하므로 추가 필터링 필요 없음
    return items;
  };

  // 현재 페이지에 표시할 아이템 가져오기
  const getCurrentPageItems = () => {
    const filteredItems = getFilteredGridItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
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
