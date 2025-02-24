import { styled } from "styled-components";

const LoginContainer = styled.div`
  width: 750px;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

// 왼쪽 로그인 폼 영역
const LoginFormSection = styled.div`
  width: 470px;
  height: 760px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  border-radius: 16px;

  .logo {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 300px;
      height: 300px;
    }
  }
  .password {
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    margin-top: 25px;

    white-space: nowrap;

    .title {
      margin: 0;
    }
  }

  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
    margin-top: 25px;
    margin-bottom: 15px;
    color: #737f8f;
  }

  .container {
    width: 100%;
    height: 600px;
    margin-top: 16px;
    max-width: 500px;

    gap: 20px;

    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;

    .inputArea {
      display: flex;
      flex-direction: column;
      gap: 16px;

      width: 420px;

      padding-top: 60px;
    }

    .login-id-container {
      display: flex;
      width: 408px;
      height: 24px;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      // gap: 10px;
      margin-right: 10px;
      margin-left: 10px;
    }

    .login-id {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 130px;
      height: 24px;
      color: #737f8f;
      font-size: 14px;
      font-weight: 400;

      .login-id-text {
        color: #737f8f;
        font-size: 14px;
        font-weight: 400;
        width: 84px;
        height: 24px;
      }
    }

    .login-links {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 20px;
      white-space: nowrap;
      width: 100%;
      height: 24px;

      .links-divider {
        border-left: 1px solid rgb(159, 159, 159, 0.3);
        height: 10px;
        width: 1px;
        margin-top: 1px;
      }

      .links a {
        color: #737f8f;
        text-decoration: none;
        font-size: 13px;
        display: flex;

        &:hover {
          color: #007bff;
        }
      }
    }
  }
`;

// 오른쪽 캐릭터 영역
const CharacterSection = styled.div`
  position: relative;
  width: 750px;
  height: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 16px;

  .yellow-circle {
    position: absolute;
    width: 300px;
    height: 300px;
    background-color: #fadf74;
    border-radius: 50%;
    opacity: 0.9;
    z-index: 0;
    top: 38%;
    left: 38%;
  }

  .opacity-yellow-circle {
    position: absolute;
    width: 330px;
    height: 330px;
    background-color: #fadf74;
    border-radius: 50%;
    opacity: 0.3; // 더 진한 투명도
    z-index: 0;
    top: 36%;
    left: 40%;
  }

  img {
    position: absolute;
    width: 150px;
    height: 150px;
    object-fit: contain;
    transition: all 0.3s ease;

    &:nth-child(1) {
      // 우산 캐릭터
      top: 20%;
      left: 55%;
      z-index: 2;
    }

    &:nth-child(2) {
      // 햇살 캐릭터
      top: 40%;
      left: 20%;
      z-index: 1;
    }

    &:nth-child(3) {
      // 구름 캐릭터
      top: 60%;
      left: 55%;
      z-index: 3;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`;

// 메인 컨테이너
const LoginComp = styled.section`
  width: 1500px;
  height: 1000px;
  border-radius: 16px;
  position: relative;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
  margin: 70px;
  justify-content: center;
`;

export { LoginFormSection, CharacterSection, LoginContainer };
export default LoginComp;
