import React, { useState } from "react";
import styled from "styled-components";
import HeartButton from "../../images/heart_button.png";
import HeartButtonClicked from "../../images/heart_click_button.png";

const StyleCard = styled.div`
  width: 210px;
  height: 210px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .like-button {
    position: absolute;
    top: 180px;
    right: 15px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
  }
`;

const OutfitsPreferCard = ({ imageUrl, alt, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 방지
    setIsLiked(!isLiked);
  };

  return (
    <StyleCard onClick={onClick}>
      <div className="like-button" onClick={handleLikeClick}>
        <img
          src={isLiked ? HeartButtonClicked : HeartButton}
          alt={isLiked ? "heart_button_clicked" : "heart_button"}
          width={12}
          height={12}
        />
      </div>
      <img
        src={imageUrl || "https://via.placeholder.com/280x380"}
        alt={alt || "스타일 이미지"}
      />
    </StyleCard>
  );
};

export default OutfitsPreferCard;
