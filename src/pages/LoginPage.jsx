import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginComp from "../component/login/LoginStyle";
import { Input, LoginButton } from "../component/login/LoginInputStyle";
import logo from "../assets/weatherfitlogo.png";
import LoginApi from "../api/LoginApi";

const LoginPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value);
    validateInputs(value, inputPw);
  };

  const onChangePw = (e) => {
    const value = e.target.value;
    setInputPw(value);
    validateInputs(inputEmail, value);
  };

  const validateInputs = (email, password) => {
    const isValid = email.length > 0 && password.length > 0;
    setIsButtonActive(isValid);
  };

  const onSubmit = async () => {
    if (isButtonActive) {
      try {
        const res = await LoginApi.login(inputEmail, inputPw);
        if (res.data.success) {
          console.log("로그인 성공 : ", res.data.success);
          navigate("/");
        } else {
          console.log("로그인 실패 : ", res.data.success);
        }
        // 로그인 API 호출 로직 추가 예정
        console.log("로그인 시도:", { inputEmail, inputPw });
        navigate("/");
      } catch (error) {
        console.error("로그인 실패:", error);
        setEmailMessage("이메일이 올바르지 않습니다.");
        setPwMessage(" 비밀번호가 올바르지 않습니다.");
      }
    }
  };

  return (
    <LoginComp>
      <div className="logo">
        {" "}
        <img src={logo} alt="Wheather FIT" />{" "}
      </div>
      <div className="title">회원님의 정보를 입력해주세요.</div>
      <div className="container">
        <div className="inputArea">
          <Input
            holder="이메일"
            value={inputEmail}
            changeEvt={onChangeEmail}
            msg={emailMessage}
          />
          <Input
            holder="비밀번호"
            value={inputPw}
            type="password"
            changeEvt={onChangePw}
            msg={pwMessage}
          />
        </div>

        <LoginButton
          $isValid={isButtonActive}
          onClick={onSubmit}
          disabled={!isButtonActive}
        >
          로그인
        </LoginButton>

        <div className="links">
          <Link to="/find-password">비밀번호 찾기</Link>
          <Link to="/join">회원가입</Link>
        </div>
      </div>
    </LoginComp>
  );
};

export default LoginPage;
