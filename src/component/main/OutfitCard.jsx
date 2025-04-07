import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  position: relative;
  width: 410px;
  height: 546px;
  border-radius: 23px;
  overflow: hidden;
  box-shadow: none;
  transition: all 0.3s ease;
  flex-shrink: 0;
  background-color: rgba(155, 155, 155, 1);

  &:hover {
    width: 480px;
    height: 640px;
    z-index: 10;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 23px;
`;

const CardTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 23px;
  border-bottom-right-radius: 23px;
`;

const OutfitCard = ({ title, imageUrl }) => {
  return (
    <CardContainer>
      <CardImage src={imageUrl} alt={title} />
      <CardTitle>{title}</CardTitle>
    </CardContainer>
  );
};

export default OutfitCard;
