import React from "react";
import styled from "styled-components";

const Card = styled.div`
  position: relative;

  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  // aspect-ratio: 3/4;
  width: 220px;
  height: 279px;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;

    color: white;

    h3 {
      margin: 0 0 5px 0;
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }
`;

const PurposeDetailCard = ({ imageUrl, title, description }) => {
  return (
    <Card>
      <img src={imageUrl} alt={title} />
      <div className="card-content"></div>
    </Card>
  );
};

export default PurposeDetailCard;
