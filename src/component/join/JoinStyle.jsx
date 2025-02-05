import { styled } from "styled-components";

const JoinComp = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--IVORY);
  border: 1px solid red;

  h2 {
    font-size: 2em;
    font-weight: 600;
    margin: 10px;
  }

  .container {
    border: 1px solid blue;
    width: 100%;
    padding: 30px;

    .profile {
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
      border: 1px solid purple;

      label {
        font-size: 1.3em;
        font-weight: 600;
        input {
        }
      }
    }
    .inputArea {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid green;
    }

    .select-age {
      border: 1px solid pink;
      label {
      }
    }
  }
`;
export default JoinComp;
