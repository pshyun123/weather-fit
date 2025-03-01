import Button from "../../utils/Button";
import { styled } from "styled-components";

// 버튼이 있는 입력창을 위한 스타일 (이메일, 인증번호용)
const InputButtonComp = styled.div`
  width: 100%;
  margin-bottom: 40px;
  position: relative;
  .inputWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    input {
      width: 70%; // 버튼 공간 확보
      font-size: 1em;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px 0 0 10px;
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

// 버튼이 있는 입력창 컴포넌트
export const InputButton = (props) => {
  const {
    value,
    holder,
    changeEvt,
    type,
    btnChild,
    active,
    btnClick,
    msg,
    msgType,
    height,
  } = props;

  // Props 값 확인을 위한 console.log 추가
  console.log("InputButton Props:", {
    value,
    holder,
    type,
    btnChild,
    active,
    msg,
    msgType,
    height,
    hasBtnClick: !!btnClick, // btnClick 함수가 존재하는지 확인
  });

  // Button 컴포넌트에 전달되는 props 확인
  console.log("Button Props:", {
    disabled: !active,
    active,
    $front: active ? "#737F8F" : "#D9D9D9",
    $back: active ? "#737F8F" : "#D9D9D9",
  });

  return (
    <InputButtonComp>
      <div className="inputWrap">
        <input
          type={type || "text"}
          defaultValue={value}
          placeholder={holder}
          onChange={changeEvt}
        />
        <Button
          clickEvt={() => btnClick && btnClick()}
          children={btnChild}
          active={active}
          width="30%"
          height={height || "60px"}
          fontSize="16px"
          $color={active ? "#5D5E62" : "#D9D9D9"}
          $front={active ? "#737F8F" : "#D9D9D9"}
          $borderRadius="0 10px 10px 0"
        />
      </div>
      <div className={`msg ${msgType ? "" : "fail"}`}>{msg}</div>
    </InputButtonComp>
  );
};

// 일반 입력창을 위한 스타일 (비밀번호, 이름용)
const InputComp = styled.div`
  width: 100%;
  margin-bottom: 40px;
  position: relative;
  input {
    width: 100%; // 버튼이 없으므로 전체 너비 사용
    padding: 20px;
    border: 1px solid #ccc;
    outline: none;
    border-radius: 10px;
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

// 일반 입력창 컴포넌트
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
        type={type || "text"}
        value={value}
        placeholder={holder}
        onChange={(e) => changeEvt(e)}
      />
      {/* <button onClick={btnClick} disabled={disabled}>
        {btnChild}
      </button> */}
      <div className={`msg ${msgType ? "" : "fail"}`}>{msg}</div>
    </InputComp>
  );
};

// 회원가입 완료 버튼
export const JoinButton = styled.button`
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
