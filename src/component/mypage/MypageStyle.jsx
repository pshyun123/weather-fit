import styled from "styled-components";

const MyPageBoard = styled.div`
  width: 1920px;
  min-height: 1440px;
  display: flex;
  flex-direction: row;
  background-color: #435a76;
  justify-content: center;
  align-items: center;
`;

const MyPageContainer = styled.div`
  width: 100%;
  max-width: 1500px;
  height: 1000px;
  padding-top: 40px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
`;

const ProfileSection = styled.div`
  display: flex;
  // gap: 20px;
  align-items: center;

  flex-direction: column;
  width: 40%;
  border-right: 1px solid #e3e4e8;
  height: 100%;

  .profile-image-header {
    font-size: 24px;
    font-weight: 500;
    color: #32363e;
  }

  .profile-container {
    position: relative;
    margin: 20px 0;
  }

  .profile-divider {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    height: 13px;
    width: 100%;
    background-color: #f9f9f9;
  }

  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .name {
      font-size: 24px;
      font-weight: bold;
      color: #000;
    }

    .email {
      color: #666;
    }
  }
`;

const ProfileBottomSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #435a76;
`;

const StyleSection = styled.div`
  width: 60%;
  h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .style-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;

    .style-item {
      position: relative;
      aspect-ratio: 1;
      background-color: #f0f0f0;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .like-button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
  }
`;

export {
  MyPageBoard,
  MyPageContainer,
  ProfileSection,
  ProfileBottomSection,
  StyleSection,
};
