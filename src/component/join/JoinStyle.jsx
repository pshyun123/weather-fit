import { styled } from "styled-components";

const JoinComp = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: 80px;

  .container {
    width: 700px;
    height: 1000px;
    position: relative;
    z-index: 10;
    background-color: white;
    border-radius: 10px;
    padding: 120px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 2em;
      font-weight: 600;
      text-align: center;
      margin-bottom: 50px;
      color: #5d5e62;
    }

    .inputArea {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 550px;
    }

    .select-age {
      margin-bottom: 15px;
      padding: 20px;
      border: 0.5px solid #c9c9c9;
      border-radius: 5px;

      h3 {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-top: 10px;
        color: #5d5e62;
      }

      p {
        margin: 25px 0;
        font-size: 16px;
        text-align: center;
        color: #a0a0a0;
      }
    }

    .group-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 50px;
    }

    .group-button {
      padding: 10px;
      border-radius: 20px;
      border: 1px solid #ccc;
      background-color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;
      color: #5d5e62;
    }

    .group-button:hover {
      background-color: #e8e8e8;
    }

    .group-button.active {
      background-color: #c9c9c9;
    }

    // 완료 버튼
    .submit-button {
      width: 419px;
      height: 65px;
      cursor: pointer;
      background-color: ${(props) =>
        props.isFormValid ? "#6a6d73" : "#406aa0"};
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      font-size: 1.1em;
      margin-left: 20px;
    }
  }

  .next-button {
    width: 460px;
    height: 65px;
    cursor: pointer;
    background-color: ${(props) =>
      props.isButtonActive ? "#406aa0" : "#6a6d73"};
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 1.1em;
    margin-top: 20px;
  }

  /* 오른쪽 배경을 노란색으로 */
  .right-section {
    background-color: #fdf5e6;
  }
`;
export default JoinComp;
