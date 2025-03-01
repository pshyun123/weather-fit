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
import CoordinateApi from "../../api/CoordinateApi";
import Common from "../../utils/Common";

const StyleGrid = () => {
  // 스타일별 데이터를 저장할 상태 추가
  const [minimalStyles, setMinimalStyles] = useState([]);
  const [modernStyles, setModernStyles] = useState([]);
  const [casualStyles, setCasualStyles] = useState([]);
  const [streetStyles, setStreetStyles] = useState([]);
  const [livelyStyles, setLivelyStyles] = useState([]);
  const [luxuryStyles, setLuxuryStyles] = useState([]);

  // 컴포넌트 마운트 시 스타일 데이터 로드
  useEffect(() => {
    const fetchStyleData = async () => {
      try {
        console.log("스타일 데이터 로드 시작");

        const minimal = await CoordinateApi.getMinimalPreferenceList();
        console.log("미니멀 스타일 데이터:", minimal);
        setMinimalStyles(minimal);

        const modern = await CoordinateApi.getModernPreferenceList();
        console.log("모던 스타일 데이터:", modern);
        setModernStyles(modern);

        const casual = await CoordinateApi.getCasualPreferenceList();
        console.log("캐주얼 스타일 데이터:", casual);
        setCasualStyles(casual);

        const street = await CoordinateApi.getStreetPreferenceList();
        console.log("스트릿 스타일 데이터:", street);
        setStreetStyles(street);

        const lively = await CoordinateApi.getLivelyPreferenceList();
        console.log("러블리 스타일 데이터:", lively);
        setLivelyStyles(lively);

        const luxury = await CoordinateApi.getLuxuryPreferenceList();
        console.log("럭셔리 스타일 데이터:", luxury);
        setLuxuryStyles(luxury);
      } catch (error) {
        console.error("스타일 데이터 로드 실패:", error);
      }
    };

    fetchStyleData();
  }, []);

  // 각 카테고리에 대한 데이터 정의
  const styleCategories = [
    {
      title: "날씨별",
      content: "날씨별 스타일 콘텐츠가 여기에 표시됩니다.",
      details: ["맑음", "비", "눈", "흐림", "바람", "더움"],
      gridItems: [
        "맑은 날 캐주얼",
        "맑은 날 포멀",
        "맑은 날 스포티",
        "맑은 날 데일리",
        "맑은 날 오피스",
        "비 오는 날 캐주얼",
        "비 오는 날 포멀",
        "비 오는 날 스포티",
        "비 오는 날 데일리",
        "비 오는 날 오피스",
        "눈 오는 날 캐주얼",
        "눈 오는 날 포멀",
        "눈 오는 날 스포티",
        "눈 오는 날 데일리",
        "눈 오는 날 오피스",
        "흐린 날 캐주얼",
        "흐린 날 포멀",
        "흐린 날 스포티",
        "흐린 날 데일리",
        "흐린 날 오피스",
        "바람 부는 날 캐주얼",
        "바람 부는 날 포멀",
        "바람 부는 날 스포티",
        "바람 부는 날 데일리",
        "바람 부는 날 오피스",
      ],
    },
    {
      title: "스타일별",
      content: "스타일별 콘텐츠가 여기에 표시됩니다.",
      details: ["미니멀", "모던", "캐주얼", "스트릿", "러블리", "럭셔리"],
      gridItems:
        minimalStyles.length > 0 ? minimalStyles : ["미니멀 스타일 로딩 중..."],
      getItems: (detail) => {
        console.log("선택된 스타일:", detail);
        switch (detail.toLowerCase()) {
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
      gridItems: [
        "데이트 룩 1",
        "데이트 룩 2",
        "데이트 룩 3",
        "데이트 룩 4",
        "데이트 룩 5",
        "출근 룩 1",
        "출근 룩 2",
        "출근 룩 3",
        "출근 룩 4",
        "출근 룩 5",
        "여행 룩 1",
        "여행 룩 2",
        "여행 룩 3",
        "여행 룩 4",
        "여행 룩 5",
        "운동 룩 1",
        "운동 룩 2",
        "운동 룩 3",
        "운동 룩 4",
        "운동 룩 5",
        "모임 룩 1",
        "모임 룩 2",
        "모임 룩 3",
        "모임 룩 4",
        "모임 룩 5",
        "일상 룩 1",
        "일상 룩 2",
        "일상 룩 3",
        "일상 룩 4",
        "일상 룩 5",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(1); // 기본적으로 "스타일별" 탭 활성화
  const [activeDetails, setActiveDetails] = useState([]);
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 5*3 그리드

  // 탭이나 필터가 변경되면 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activeDetails]);

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
      return category.gridItems;
    }

    // 스타일별 탭에서는 getItems 함수 사용
    if (activeTab === 1 && category.getItems) {
      return category.getItems(activeDetails[0]);
    }

    // 다른 탭에서는 기존 필터링 로직 사용
    const selectedStyle = activeDetails[0].toLowerCase();
    return category.gridItems.filter((item) =>
      item.toLowerCase().includes(selectedStyle)
    );
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
          active={i === currentPage}
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
                  {item.coordinateImg ? (
                    <img
                      src={getImageUrl(item.coordinateImg)}
                      alt={item.preference || "착장 이미지"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        console.error("이미지 로드 실패:", item.coordinateImg);
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
                <div className="grid-info" style={{ padding: "8px" }}>
                  <div
                    className="grid-preference"
                    style={{
                      fontSize: "14px",
                      marginBottom: "4px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.preference || "스타일 정보 없음"}
                  </div>
                </div>
              </>
            )}
            <div
              className="grid-like-icon"
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                zIndex: 2,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "50%",
                padding: "4px",
              }}
              onClick={(e) => {
                e.stopPropagation(); // 그리드 아이템 클릭 이벤트 전파 방지
                // 좋아요 기능 구현 (향후 추가)
              }}
            >
              <img
                src={likeIcon}
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
