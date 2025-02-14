import { styled } from "styled-components";

const LoginComp = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--IVORY);
  height: 100vh;

  .logo {
    // margin: 50px 0;
    img {
      width: 300px;
      height: 200px;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #737f8f;
  }

  .container {
    width: 100%;
    max-width: 400px;
    padding: 30px;

    .inputArea {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;
    }

    .links {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;

      a {
        color: #666;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default LoginComp;
