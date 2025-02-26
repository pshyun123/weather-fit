import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginComp, {
  LoginFormSection,
  CharacterSection,
  LoginContainer,
} from "../component/login/LoginStyle";
import {
  Input,
  LoginButton,
  JoinButton,
} from "../component/login/LoginInputStyle";
import logo from "../images/weatherfitlogo.png";
import LoginApi from "../api/LoginApi";
import rainCharacter from "../images/raniny.png";
import sunCharacter from "../images/sunnynohand.png";
import snowCharacter from "../images/snowy.png";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { setIsLoggedIn, setUserProfile } = useAuth();

  //useAuth의 기능은 로그인 상태 확인 및 프로필 정보 업데이트
  //자세히 설명하자면,
  //1. 로그인 상태 확인
  //2. 프로필 정보 업데이트
  //3. 로그인 상태 확인
  //4. 프로필 정보 업데이트
  //5. 로그인 상태 확인
  //6. 프로필 정보 업데이트

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

  const onClickLogin = async () => {
    try {
      const res = await LoginApi.login(inputEmail, inputPw);
      console.log("로그인 응답:", res.data);

      if (res.data.success) {
        setIsLoggedIn(true);
        setUserProfile(res.data); // 로그인 성공 시 프로필 정보 업데이트
        navigate("/");
      } else {
        setEmailMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
        setPwMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setEmailMessage("로그인 중 오류가 발생했습니다.");
      setPwMessage("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginComp>
      <LoginContainer>
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
              onClick={onClickLogin}
              disabled={!isButtonActive}
            >
              로그인
            </LoginButton>

            <div className="login-id-container">
              <div className="login-id">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-label">아이디 저장</span>
              </div>

              <div className="login-links">
                <div className="links">
                  <Link to="/find-password">비밀번호 찾기</Link>
                </div>
                <div className="links-divider"></div>
                <div className="links">
                  {" "}
                  <Link to="/join">회원가입</Link>
                </div>
              </div>
            </div>
          </div>
        </LoginFormSection>
      </LoginContainer>

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
