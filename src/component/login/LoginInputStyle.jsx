import { styled } from "styled-components";

const InputComp = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    height: 48px;
    padding: 0 10px;
    border: 1px solid #ccc;
    outline: none;
    border-radius: 5px;
    font-size: 1em;
  }

  .msg {
    position: absolute;
    padding-top: 5px;
    padding-left: 2px;
    color: red;
    font-size: 0.8em;
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
  height: 48px;
  border: none;
  font-weight: 700;
  background-color: ${(props) => (props.$isValid ? "#007bff" : "#cccccc")};
  color: white;
  border-radius: 6px;
  cursor: ${(props) => (props.$isValid ? "pointer" : "not-allowed")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isValid ? "#0056b3" : "#cccccc")};
  }
`;
