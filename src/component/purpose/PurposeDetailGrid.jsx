import React, { useState } from "react";
import styled from "styled-components";
import PurposeDetailCard from "./PurposeDetailCard";
import PurposeDetailPagination from "./PurposeDetailPagination";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.2fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 80px;
  width: 100%;
  max-width: 1200px;
  background-color: rgba(255, 252, 244, 0.95);
  border-radius: 20px;
  min-height: 600px;
  justify-items: center;
  align-items: center;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff4444;
  font-size: 1.2rem;
`;

const PurposeDetailGrid = ({ items, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 4x2 그리드

  if (loading) {
    return <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!items || items.length === 0) {
    return <LoadingMessage>표시할 데이터가 없습니다.</LoadingMessage>;
  }

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <GridContainer>
        {currentItems.map((item, index) => (
          <PurposeDetailCard
            key={index}
            title={item.title || "제목 없음"}
            description={item.description || "설명 없음"}
            imageUrl={item.coordinateImg || "https://picsum.photos/410/546"}
          />
        ))}
      </GridContainer>
      <PurposeDetailPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PurposeDetailGrid;
