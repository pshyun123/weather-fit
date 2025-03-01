import { styled } from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  height: 60px;

  .logo {
    cursor: pointer;
  }

  .logo img {
    width: 90px;
    height: auto;
  }

  .user-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .user-icon img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  .default-user {
    width: 30px;
    height: 30px;
  }

  .options {
    position: absolute;
    top: 100%;
    right: 0;
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
  }

  .options div {
    padding: 8px 16px;
    color: #333;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
  }

  .options div:hover {
    background-color: #f5f5f5;
  }

  .options.show {
    opacity: 1;
    transform: translateY(5px);
  }
`;

export default HeaderContainer;
