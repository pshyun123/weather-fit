import { styled } from "styled-components";

// 왼쪽 로그인 폼 영역
const LoginFormSection = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // padding-left: 210px;

  .logo {
    margin-top: 216px;
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      width: 300px;
      height: 200px;
      object-fit: contain;
    }
  }
  .password {
    display: flex;
    margin-top: 25px;
    gap: 20px;
  }

  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
    margin-top: 15px;
    margin-bottom: 15px;
    color: #737f8f;
  }

  .container {
    width: 100%;
    max-width: 300px;
    margin-top: 20px;

    .inputArea {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }

    .links {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        color: #737f8f;
        text-decoration: none;
        font-size: 13px;
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
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cccccc;

  img {
    position: absolute;
    width: 100px;
    height: 100px;
    object-fit: contain;

    &:nth-child(1) {
      top: 35%;
      right: 60%;
    }

    &:nth-child(2) {
      top: 45%;
      right: 40%;
    }

    &:nth-child(3) {
      top: 55%;
      right: 50%;
    }
  }
`;

// 메인 컨테이너
const LoginComp = styled.section`
  width: 100%;
  height: 1000px;
  margin: 0 auto;
  position: relative;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
`;

export { LoginFormSection, CharacterSection };
export default LoginComp;
