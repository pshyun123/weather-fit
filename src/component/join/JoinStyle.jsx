import { styled } from "styled-components";

const JoinComp = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  .container {
    width: 100%;
    padding: 30px;

    h2 {
      font-size: 2em;
      font-weight: 600;
      text-align: center;
    }

    p {
      text-align: center;
      font-size: 0.9em;
      margin: 20px;
      color: #737f8f;
    }

    /* 오른쪽 배경을 노란색으로 */
    .right-section {
      background-color: yellow;
    }

    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 50px;

      label {
        font-size: 1.3em;
        font-weight: 600;
      }
    }
    .inputArea {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      input {
        border: none;
        border-bottom: 1px solid #b8b8b8;
        border-radius: 0;
      }
    }

    .select-age {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;

      h3 {
        text-align: center;
        font-size: 1.2em;
        font-weight: 600;
        margin-top: 10px;
      }

      p {
        margin-bottom: 30px;
      }
    }

    .age-group-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 10px;
    }

    .age-group-button {
      padding: 10px;
      border-radius: 20px;
      border: 1px solid #ccc;
      background-color: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .age-group-button:hover {
      background-color: #e8e8e8;
    }

    .age-group-button.active {
      background-color: #c9c9c9;
    }

    // 완료 버튼
    .submitButton {
      width: 419px;
      height: 65px;
      cursor: pointer;
      background-color: #6a6d73;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      font-size: 1.1em;
      margin-left: 120px;
    }
  }

  /* 오른쪽 배경을 노란색으로 */
  .right-section {
    background-color: #fdf5e6;
  }
`;
export default JoinComp;
