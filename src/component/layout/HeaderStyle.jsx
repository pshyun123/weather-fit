import { styled } from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 1200px;
  margin: 0 auto;

  color: #fff;
  height: 80px;

  .logo {
    font-size: 40px;
    font-weight: 400;
    color: #333333;
    font-family: "MedulaOne-Regular";
  }

  .user-icon {
    width: 40px;
    height: 40px;
    position: relative;
    display: flex;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .profile-image {
      border: 1px solid #e1e1e1;
      min-width: 40px;
      min-height: 40px;
    }
  }

  .options {
    position: absolute;
    top: 100%;
    transform: translateX(50%);
    right: 50%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 8px 0;
    min-width: max-content;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    display: flex;
    flex-direction: column;

    div {
      padding: 8px 16px;
      color: #333;
      cursor: pointer;
      white-space: nowrap;
      width: 100%;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  .options.show {
    opacity: 1;
    transform: translate(50%, 5px);
  }
`;

export default HeaderContainer;
