import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginComp, {
  LoginFormSection,
  CharacterSection,
} from "../component/login/LoginStyle";
import {
  Input,
  LoginButton,
  JoinButton,
} from "../component/login/LoginInputStyle";
import logo from "../assets/weatherfitlogo.png";
import LoginApi from "../api/LoginApi";
import rainCharacter from "../assets/raniny.png";
import sunCharacter from "../assets/sunnynohand.png";
import snowCharacter from "../assets/snowy.png";

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
        console.log("로그인 응답:", res.data);

        if (res.data && res.data.success) {
          console.log("로그인 성공");
          navigate("/");
        } else {
          console.log("로그인 실패");
          setEmailMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
          setPwMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("로그인 실패:", error.response?.data);
        setEmailMessage("로그인 처리 중 오류가 발생했습니다.");
        setPwMessage("로그인 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <LoginComp>
      <LoginFormSection>
        <div className="logo">
          {" "}
          <img src={logo} alt="Wheather FIT" />{" "}
        </div>
        <div className="title">회원님의 정보를 입력해주세요 :)</div>
        <div className="container">
          <div className="inputArea">
            <Input
              holder="이메일 입력"
              value={inputEmail}
              changeEvt={onChangeEmail}
              msg={emailMessage}
            />
            <Input
              holder="비밀번호 입력"
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

          <div className="title">
            <hr />
            아직 회원이 아니신가요?
            <hr />
          </div>
          <JoinButton onClick={() => navigate("/join")}>회원가입</JoinButton>

          <div className="password">
            <div className="title">비밀번호를 잊으셨나요?</div>
            <div className="links">
              <Link to="/find-password">비밀번호 찾기</Link>
            </div>
          </div>
        </div>
      </LoginFormSection>

      <CharacterSection>
        <img
          src={rainCharacter}
          alt="우산 캐릭터"
          style={{ width: "300px", height: "300px" }}
        />
        <img
          src={sunCharacter}
          alt="햇살 캐릭터"
          style={{ width: "300px", height: "300px" }}
        />
        <img
          src={snowCharacter}
          alt="눈 캐릭터"
          style={{ width: "300px", height: "300px" }}
        />

        <div className="yellow-circle"></div>
        <div className="opacity-yellow-circle"></div>
      </CharacterSection>
    </LoginComp>
  );
};

export default LoginPage;
