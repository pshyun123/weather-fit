import { styled } from "styled-components";

const InputComp = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;

  input {
    width: 100%;
    height: 45px;
    padding: 0 15px;
    border: 1px solid #e1e1e1;
    outline: none;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
    }

    &::placeholder {
      color: #999;
    }
  }

  .msg {
    position: absolute;
    padding-top: 5px;
    padding-left: 2px;
    color: #ff4d4f;
    font-size: 12px;
  }
`;

export const Input = (props) => {
  const { value, holder, changeEvt, type, msg } = props;
  return (
    <InputComp>
      <input
        type={type || "text"}
        value={value}
        placeholder={holder}
        onChange={changeEvt}
      />
      {msg && <div className="msg">{msg}</div>}
    </InputComp>
  );
};

export const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  background-color: ${(props) => (props.$isValid ? "#4981f8" : "#cccccc")};
  color: white;
  border-radius: 5px;
  cursor: ${(props) => (props.$isValid ? "pointer" : "not-allowed")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isValid ? "#3a6cd4" : "#cccccc")};
  }
`;

export const JoinButton = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  background-color: #cccccc;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #cccccc;
  }
`;
