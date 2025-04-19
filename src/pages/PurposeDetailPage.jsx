import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PurposeDetailHeader from "../component/purpose/PurposeDetailHeader";
import PurposeDetailGrid from "../component/purpose/PurposeDetailGrid";
import CoordinateApi from "../api/CoordinateApi";

const PurposeDetailPageWrapper = styled.div`
  background-color: rgba(60, 59, 59, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container {
    margin: 0 auto;
    background-color: rgba(255, 252, 244, 0.95);
    border-radius: 20px;
    padding: 20px;
    border: 1px solid blue;
    width: 1201px;
    height: 794px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const PurposeDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [tpoData, setTpoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTpoData = async (tabId) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (tabId) {
        case 1: // 데일리룩
          response = await CoordinateApi.getDailyTpoList();
          break;
        case 2: // 미팅룩
          response = await CoordinateApi.getMeetingTpoList();
          break;
        case 3: // 데이트룩
          response = await CoordinateApi.getDateTpoList();
          break;
        case 4: // 운동룩
          response = await CoordinateApi.getExerciseTpoList();
          break;
        case 5: // 출근룩
          response = await CoordinateApi.getWorkTpoList();
          break;
        case 6: // 파티룩
          response = await CoordinateApi.getPartyTpoList();
          break;
        case 7: // 여행룩
          response = await CoordinateApi.getTravelTpoList();
          break;
        case 8: // 웨딩룩
          response = await CoordinateApi.getWeddingTpoList();
          break;
        default:
          response = await CoordinateApi.getDailyTpoList();
      }
      console.log(`${tabId}번 탭 데이터 조회 성공:`, response);
      setTpoData(response);
    } catch (err) {
      console.error(`${tabId}번 탭 데이터 조회 실패:`, err);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTpoData(selectedTab);
  }, [selectedTab]);

  const handleTabChange = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <PurposeDetailPageWrapper>
      <PurposeDetailHeader
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />
      <PurposeDetailGrid items={tpoData} loading={loading} error={error} />
    </PurposeDetailPageWrapper>
  );
};

export default PurposeDetailPage;
