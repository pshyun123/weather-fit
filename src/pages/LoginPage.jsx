import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginComp, {
  LoginFormSection,
  CharacterSection,
  LoginContainer,
  LoginPageBoard,
} from "../component/login/LoginStyle";
import { LoginButton, CombinedInput } from "../component/login/LoginInputStyle";
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
  const [saveId, setSaveId] = useState(false);
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

  // 페이지 로드 시 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const isSaveId = localStorage.getItem("saveId") === "true";

    if (savedEmail && isSaveId) {
      setInputEmail(savedEmail);
      setSaveId(true);
      validateInputs(savedEmail, inputPw);
    }
  }, []);

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
        // 아이디 저장 체크박스가 선택된 경우 로컬 스토리지에 이메일 저장
        if (saveId) {
          localStorage.setItem("savedEmail", inputEmail);
          localStorage.setItem("saveId", "true");
        } else {
          localStorage.removeItem("savedEmail");
          localStorage.setItem("saveId", "false");
        }

        // 세션 스토리지에 사용자 정보 저장
        const userInfo = {
          id: res.data.id,
          email: res.data.email,
          name: res.data.name,
          profileImage: res.data.profileImage,
          ageGroup: res.data.ageGroup,
          preferences: res.data.preferences,
        };
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("세션 스토리지에 저장된 사용자 정보:", userInfo);

        setIsLoggedIn(true);
        setUserProfile(res.data); // 로그인 성공 시 프로필 정보 업데이트
        navigate("/");
      } else {
        setEmailMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
        setPwMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setEmailMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
      setPwMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  // 체크박스 상태 변경 핸들러
  const handleSaveIdChange = (e) => {
    setSaveId(e.target.checked);
  };

  return (
    <LoginPageBoard>
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
                <CombinedInput
                  emailValue={inputEmail}
                  pwValue={inputPw}
                  emailChangeEvt={onChangeEmail}
                  pwChangeEvt={onChangePw}
                  emailMsg={emailMessage}
                  pwMsg={pwMessage}
                />
                <div
                  className="input-error-message"
                  style={{
                    color: "#ff3b30",
                    fontSize: "14px",
                    marginTop: "8px",
                    marginBottom: "16px",
                    height: "20px",
                    textAlign: "left",
                    paddingLeft: "10px",
                  }}
                >
                  {emailMessage || pwMessage || " "}
                </div>
              </div>

              <div style={{ width: "420px", borderRadius: "10px" }}>
                <LoginButton
                  $isValid={isButtonActive}
                  onClick={onClickLogin}
                  disabled={!isButtonActive}
                >
                  로그인
                </LoginButton>
              </div>

              <div className="login-id-container">
                <div className="login-id">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={saveId}
                    onChange={handleSaveIdChange}
                  />
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
    </LoginPageBoard>
  );
};

export default LoginPage;
