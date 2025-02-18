import React from "react";
import { StyleSection } from "./MypageStyle";

const StyleGrid = () => {
  return (
    <StyleSection>
      <h2>내가 찜한 스타일</h2>
      <div className="style-grid">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="style-item">
            <img
              src={`/path/to/style/image${item}.jpg`}
              alt={`스타일 ${item}`}
            />
            <div className="like-button">❤️</div>
          </div>
        ))}
      </div>
    </StyleSection>
  );
};

export default StyleGrid;
