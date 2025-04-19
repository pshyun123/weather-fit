import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  border: 1px solid red;

  width: 1000px;

  .header-content {
    display: flex;
    gap: 2px;
  }

  .tab-button {
    width: 123.8px;
    height: 60px;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    background-color: #e8e8e8;
    color: #666;
    transition: all 0.2s;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px 20px 0 0;

    &.active {
      background-color: #ff9999;
      color: #fff;
    }
  }
`;

const PurposeDetailHeader = ({ selectedTab, onTabChange }) => {
  const tabs = [
    { id: 1, name: "데일리룩" },
    { id: 2, name: "미팅룩" },
    { id: 3, name: "데이트룩" },
    { id: 4, name: "운동룩" },
    { id: 5, name: "출근룩" },
    { id: 6, name: "파티룩" },
    { id: 7, name: "여행룩" },
    { id: 8, name: "웨딩룩" },
  ];

  return (
    <HeaderContainer>
      <div className="header-content">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${selectedTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </HeaderContainer>
  );
};

export default PurposeDetailHeader;
