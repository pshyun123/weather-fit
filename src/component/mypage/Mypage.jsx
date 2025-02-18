import styled from "styled-components";

const MyPageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: row;
  //   justify-content: space-between;
`;

const ProfileSection = styled.div`
  display: flex;

  gap: 20px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 40%;

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

const StyleSection = styled.div`
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

export { MyPageContainer, ProfileSection, StyleSection };
