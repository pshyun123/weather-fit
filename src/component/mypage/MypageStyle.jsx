import styled from "styled-components";

const MyPageBoard = styled.div`
  width: 1920px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  // padding: 40px 0;
`;

const MyPageContainer = styled.div`
  width: 1200px;
  display: flex;
  // gap: 40px;
`;

const ProfileSection = styled.div`
  width: 291px;
  background: rgba(226, 226, 226, 1);
  border-radius: 8px;
  padding: 24px;
  height: 331px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  margin-bottom: 60px;

  .profile-image-header {
    font-size: 24px;
    font-weight: 500;
    color: rgba(50, 54, 62, 1);
    margin-bottom: 24px;
    width: 130px;
    height: 22px;
    text-align: center;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }

  .profile-info {
    margin-top: 16px;
    text-align: center;

    .name {
      font-size: 18px;
      font-weight: 500;
      color: #262626;
    }
  }
`;

const BasicInfoSection = styled.div`
  width: 347px;
  height: 986px;
  background: rgba(243, 243, 243, 1);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 120px;

  .basic-info-title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(50, 54, 62, 1);
    margin-bottom: 24px;
    width: 130px;
    height: 22px;
    text-align: center;
    margin-bottom: 30px;
  }

  .email-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 280px;
    height: 28px;
    margin-bottom: 16px;
    gap: 30px;
  }

  .email-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(166, 166, 166, 1);
    width: 80px;
  }

  .email {
    color: rgba(166, 166, 166, 1);
    font-size: 18px;
    font-weight: 400;
    width: 90px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .edit-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 280px;
    height: 28px;
    margin-bottom: 16px;
    gap: 30px;
  }

  .edit-title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(166, 166, 166, 1);
    width: 80px;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .edit-content {
    color: rgba(166, 166, 166, 1);
    font-size: 18px;
    font-weight: 400;
    width: 90px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

// 스타일 그리드 컴포넌트

const StyleSection = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 26px;

  padding-top: 140px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 30px;
  }

  .style-grid {
    display: flex;
    flex-direction: row;
    gap: 24px;
    width: 100%;
    margin-bottom: 40px;

    .style-item {
      flex: 1;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      }

      .style-item-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }

      .style-item-content {
        padding: 16px;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 1)
        );
      }

      .style-item-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      .style-item-description {
        font-size: 14px;
        color: #666;
      }
    }
  }
`;

// StyleGrid 컴포넌트에서 사용하는 스타일 컴포넌트들
const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 100px;

  flex-direction: column;
  gap: 8px;
`;

const TabItem = styled.div`
  flex: 1;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.active ? "rgba(0,0,0,1)" : "rgba(201,201,201,1)")};
  font-weight: ${(props) => (props.active ? "500" : "500")};

  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22px;
  height: 50px;

  /* 하단 표시선 */
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.3px;
    z-index: 1;
  }

  /* 구분선 */
  &:not(:last-child) {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 20px; /* 구분선의 세로 길이 */
      background-color: rgba(201, 201, 201, 1);
    }
  }

  &:hover {
    color: ${(props) =>
      props.active ? "rgba(0,0,0,1)" : "rgba(201,201,201,1)"};
  }
`;

const ContentContainer = styled.div`
  padding: 10px;
  min-height: 300px;

  width: 786px;
  height: 470px;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  grid-template-rows: repeat(3, 150px);
  gap: 6px;
  justify-content: center;
`;

const SelectContainer = styled.div`
  width: 330px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DetailContainer = styled.div`
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
  padding-left: 4px;
  display: flex;
  flex-direction: row;

  margin-top: 10px;
`;

const StyleButton = styled.button`
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid rgba(201, 201, 201, 1);
  background-color: ${(props) =>
    props.active ? "rgba(78,78,78,1)" : "rgba(255, 255, 255, 1)"};
  color: ${(props) => (props.active ? "#FFFFFF" : "rgba(93, 94, 98, 1)")};
  font-size: 14px;

  &:hover {
    background-color: ${(props) =>
      props.active ? "rgba(78,78,78,1)" : "#E0E0E0"};
    color: ${(props) => (props.active ? "#FFFFFF" : "rgba(93, 94, 98, 1)")};
  }
`;

const GridBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #4981f8;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }

  &:hover:before {
    transform: translateY(0);
  }

  .grid-image {
    width: 150px;
    height: 150px;
    background-color: #e0e0e0;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #999;
  }
  .grid-like-icon {
    position: absolute;
    top: 106px;
    left: 106px;
    width: 40px;
    height: 40px;

    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
`;

const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.active ? "#4981f8" : "#ddd")};
  background-color: ${(props) => (props.active ? "#4981f8" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#4981f8" : "#f0f0f0")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageArrow = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export {
  MyPageBoard,
  MyPageContainer,
  ProfileSection,
  BasicInfoSection,
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
};
