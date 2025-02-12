import Button from "../../utils/Button";
import { styled } from "styled-components";

const InputButtonComp = styled.div`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  .inputWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    input {
      width: 64%;
      outline: none;
      font-size: 1em;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
  .msg {
    position: absolute;
    padding-top: 5px;
    padding-left: 2px;
    letter-spacing: 0.8px;
    word-break: keep-all;
    font-size: 0.8em;
    font-weight: 600;
    &.fail {
      color: red;
    }
  }
`;

export const InputButton = (props) => {
  const {
    value,
    holder,
    changeEvt,
    type,
    btnChild,
    active,
    clickEvt,
    msg,
    msgType,
    height,
    btnClick,
    disabled,
  } = props;

  return (
    <InputButtonComp active={active}>
      <div className="inputWrap">
        <input
          type={type ? type : "text"}
          defaultValue={value}
          placeholder={holder}
          onChange={changeEvt}
        />

        <Button
          onClick={btnClick}
          disabled={disabled}
          className={active ? "active" : ""}
          children={btnChild}
          active={active}
          clickEvt={clickEvt}
          width="30%"
          height={height ? height : "48px"}
          fontSize="14px"
          color="black"
        />
      </div>
      <div className={`msg ${msgType ? "" : "fail"}`}>{msg}</div>
    </InputButtonComp>
  );
};

const InputComp = styled.div`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  input {
    width: 100%;
    height: 48px;
    padding: 0 10px;
    border: 1px solid #ccc;
    outline: none;
    border-radius: 5px;
    font-size: 1em;
    &:disabled {
      opacity: 1;
      background-color: gray;
    }
  }
  .msg {
    position: absolute;
    padding-top: 5px;
    padding-left: 2px;
    letter-spacing: 0.8px;
    word-break: keep-all;
    font-size: 0.8em;
    font-weight: 600;
    &.fail {
      color: red;
    }
  }
`;
export const Input = (props) => {
  const {
    value,
    holder,
    changeEvt,
    type,
    msg,
    msgType,
    disabled,
    btnClick,
    btnChild,
  } = props;
  return (
    <InputComp>
      <input
        type={type ? type : "text"}
        value={value}
        placeholder={holder}
        onChange={(e) => changeEvt(e)}
      />
      <button onClick={btnClick} disabled={disabled}>
        {btnChild}
      </button>
      <div className={`msg ${msgType ? "" : "fail"}`}>{msg}</div>
    </InputComp>
  );
};
