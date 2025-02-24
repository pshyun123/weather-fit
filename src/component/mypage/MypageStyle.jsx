import styled from "styled-components";

const MyPageBoard = styled.div`
  width: 1920px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  // padding: 40px 0;
  border: 1px solid red;
`;

const MyPageContainer = styled.div`
  width: 1200px;
  display: flex;
  // gap: 40px;
  border: 1px solid blue;
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

  margin-bottom: 120px;

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

  .basic-info-title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(50, 54, 62, 1);
    margin-bottom: 24px;
    width: 130px;
    height: 22px;
    text-align: center;
    margin-bottom: 24px;
  }

  .email-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    color: rgba(166, 166, 166, 1);
    width: 280px;
    height: 28px;
  }

  .email {
    color: #666;
    font-size: 18px;
    text-align: center;
    color: rgba(166, 166, 166, 1);
    width: 192px;
    height: 28px;
  }
`;

const StyleSection = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid green;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 24px;
  }

  .style-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    .style-item {
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .like-button {
        position: absolute;
        bottom: 12px;
        right: 12px;
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
`;

export {
  MyPageBoard,
  MyPageContainer,
  ProfileSection,
  BasicInfoSection,
  StyleSection,
};
