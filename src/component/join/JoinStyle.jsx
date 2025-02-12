import { styled } from "styled-components";

const JoinComp = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 2em;
    font-weight: 600;
    margin: 10px;
  }

  .container {
    width: 100%;
    padding: 30px;

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
    }

    .inputArea > div:nth-child(1) button,
    .inputArea > div:nth-child(2) button {
      background-color: #cccccc;
      color: black;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      opacity: 0.6;

      &.active {
        background-color: #007bff;
        opacity: 1;
      }
    }

    .select-age {
      margin-bottom: 20px;
    }

    .age-group-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 10px;
    }

    .age-group-button {
      padding: 10px;
      border: 1px solid #ccc;
      background-color: #f8f8f8;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .age-group-button:hover {
      background-color: #e8e8e8;
    }

    .age-group-button.active {
      background-color: #007bff;
      color: white;
    }

    // 완료 버튼
    .submitButton {
      cursor: pointer;
      background-color: #cccccc;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
    }
  }
`;
export default JoinComp;
