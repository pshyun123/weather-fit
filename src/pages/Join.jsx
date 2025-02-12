import { useState, useCallback } from "react";
import UserApi from "../api/UserApi";
import JoinComp from "../component/join/JoinStyle";
import { InputButton, Input } from "../component/join/JoinInputstyle";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  // 입력 칸에 이메일, 이메일 인증, 비밀번호, 이름 입력 / 프로필, 나이대별 선택
  const [inputEmail, setInputEmail] = useState(""); // 이메일
  const [inputEmailConf, setInputEmailConf] = useState(""); // 이메일 인증
  const [inputPw, setInputPw] = useState(""); // 비밀번호
  const [inputPw2, setInputPw2] = useState(""); // 비밀번호 확인
  const [inputName, setInputName] = useState(""); // 이름
  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지
  const [ageGroup, setAgeGroup] = useState(""); // 나이대 고르기

  // 메세지 입력
  const [emailMessage, setEmailMessage] = useState("");
  const [emailConfMessage, setEmailConfMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pw2Message, setPw2Message] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [profileImageMessage, setProfileImageMessage] = useState("");
  const [ageGroupMessage, setAgeGroupMessage] = useState("");

  // 입력이 모두 되어있으면 버튼 눌리도록 설정
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailConf, setIsEmailConf] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPw2, setIsPw2] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isProfileImage, setIsProfileImage] = useState(false);
  const [isAgeGroup, setIsAgeGroup] = useState(false);

  // 완료하기 활성화 비활성화 버튼
  const [isButtonActive, setIsButtonActive] = useState(false);

  // 페이지 이동
  const navigate = useNavigate();

  // 모든 입력이 유효한지 확인하는 함수
  const isAllInputValid = useCallback(() => {
    const isValid =
      inputEmail &&
      isEmailConf &&
      inputPw &&
      isPw2 &&
      inputName &&
      profileImage &&
      ageGroup;
    setIsButtonActive(isValid);
    return isValid;
  }, [
    inputEmail,
    isEmailConf,
    inputPw,
    isPw2,
    inputName,
    profileImage,
    ageGroup,
  ]);

  // 각 입력 상태가 변경될 때마다 전체 유효성 확인
  useEffect(() => {
    isAllInputValid();
  }, [
    inputEmail,
    inputEmailConf,
    inputPw,
    inputPw2,
    inputName,
    profileImage,
    ageGroup,
    isAllInputValid,
  ]);

  // 이메일, 비밀번호 정규식
  const regexList = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?])[A-Za-z\d@$!%_*?]{8,15}$/,
  };

  const isUnique = async (type, value) => {
    try {
      const res = await UserApi.checkUnique(type, value);
      if (res.data.success) {
        if (type === "email") {
          setEmailMessage("사용 가능한 이메일입니다.");
          setIsEmail(true);
          setIsButtonActive(true); // 이메일이 유효하고 중복이 아닐 때 버튼 활성화
        } // ... 다른 타입에 대한 처리
      } else {
        if (type === "email") {
          setEmailMessage("이미 사용 중인 이메일입니다.");
          setIsEmail(false);
          setIsButtonActive(false); // 이메일이 중복일 때 버튼 비활성화
        }
      }
    } catch (err) {
      console.error("중복 검사 실패:", err);
      setIsButtonActive(false); // 에러 발생 시 버튼 비활성화
    }
  };

  // 이메일
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value);
    const isValidFormat = regexList.email.test(value);
    setIsValidEmail(isValidFormat); // 이메일 형식 유효성 상태 업데이트

    if (!isValidFormat) {
      setEmailMessage("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
      setIsButtonActive(false);
    } else {
      setEmailMessage("이메일 형식이 올바릅니다.");
      setIsEmail(true);
      isUnique("email", value);
    }
  };

  // 이메일 인증번호 요청
  const sendEmailAuthCode = async () => {
    try {
      const res = await UserApi.emailAuth(inputEmail); // API 호출
      if (res.data.success) {
        console.log("인증번호 요청 성공 : ", res.data.success);
        setEmailConfMessage("인증번호가 발송되었습니다.");
        setIsButtonActive(true); // 인증번호 발송 성공 시 버튼 활성화
      } else {
        setEmailConfMessage("인증번호 발송 실패.");
        setIsButtonActive(false); // 실패 시 버튼 비활성화
      }
    } catch (error) {
      console.error("인증번호 요청 실패:", error);
      setIsButtonActive(false);
    }
  };

  // 이메일 요청 확인
  const onChangeEmailConf = (e) => {
    const value = e.target.value;
    setInputEmailConf(value);

    // 인증번호 유효성 검사 (6자리 숫자)
    const isValidAuthCode = /^\d{6}$/.test(value);
    setIsEmailConf(isValidAuthCode);
    setIsButtonActive(isValidAuthCode);

    if (isValidAuthCode) {
      setEmailConfMessage("인증번호 형식이 올바릅니다.");
      setIsEmailConf(true);
      setIsButtonActive(true); // 유효한 인증번호 입력 시 버튼 활성화
    } else {
      setEmailConfMessage("올바른 인증번호를 입력해주세요.");
      setIsEmailConf(false);
      setIsButtonActive(false); // 유효하지 않은 경우 버튼 비활성화
    }
  };

  // 실제 인증번호 확인 로직
  const verifyEmailAuthCode = async () => {
    try {
      // 요청 전 데이터 확인
      console.log("인증번호 확인 요청:", {
        email: inputEmail,
        code: inputEmailConf,
        type: typeof inputEmailConf, // 타입 체크 추가
      });

      const res = await UserApi.emailAuthCheck(inputEmail, inputEmailConf);
      console.log("인증번호 확인 응답:", res);

      if (res.data === true) {
        // 백엔드에서 Boolean을 반환하므로 수정
        setEmailConfMessage("이메일 인증이 완료되었습니다.");
        setIsEmailConf(true);
        setIsButtonActive(true);
      } else {
        setEmailConfMessage("인증번호가 올바르지 않습니다.");
        setIsEmailConf(false);
        setIsButtonActive(false);
      }
    } catch (error) {
      console.error("인증번호 확인 상세 에러:", error.response?.data); // 상세 에러 로그 추가
      setEmailConfMessage("인증 과정에서 오류가 발생했습니다.");
      setIsEmailConf(false);
      setIsButtonActive(false);
    }
  };

  // 비밀번호
  const onChangePw = (e) => {
    const value = e.target.value;
    setInputPw(value);
    if (!regexList.password.test(value)) {
      setPwMessage("비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.");
      setIsPw(false);
    } else {
      setPwMessage("사용 가능한 비밀번호입니다.");
      setIsPw(true);
    }
  };

  // 비밀번호 확인
  const onChangePw2 = (e) => {
    const value = e.target.value;
    setInputPw2(value);
    if (value !== inputPw) {
      setPw2Message("비밀번호가 일치하지 않습니다.");
      setIsPw2(false);
    } else {
      setPw2Message("비밀번호가 일치합니다.");
      setIsPw2(true);
    }
  };

  // 이름
  const onChangeName = (e) => {
    const value = e.target.value;
    setInputName(value);
    if (value.length < 2 || value.length > 5) {
      setNameMessage("이름은 2~5자 사이여야 합니다.");
      setIsName(false);
    } else {
      setNameMessage("사용 가능한 이름입니다.");
      setIsName(true);
    }
  };

  const onChangeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setIsProfileImage(true);
    } else {
      setProfileImageMessage("이미지를 선택하세요.");
      setIsProfileImage(false);
    }
  };

  // 나이대 선택하기
  const ageGroups = [
    "20대 초반",
    "20대 중반",
    "20대 후반",
    "30대 초반",
    "30대 중반",
    "30대 후반",
  ];

  // 나이대 목록
  const onChangeAgeGroup = (selectedGroup) => {
    setAgeGroup((prevGroup) => {
      const newGroup = prevGroup === selectedGroup ? "" : selectedGroup;
      setIsAgeGroup(newGroup !== "");
      return newGroup;
    });
  };

  const onSubmit = async () => {
    if (isAllInputValid()) {
      try {
        const res = await UserApi.joinUser({
          email: inputEmail,
          password: inputPw,
          name: inputName,
          profileImage: profileImage,
          ageGroup: ageGroup,
        });
        console.log("회원가입 성공:", res.data);
        navigate("/"); // 회원가입 성공 후 메인 페이지로 이동
      } catch (error) {
        console.error("회원가입 실패:", error);
      }
    } else {
      console.error("입력 값을 확인하세요.");
    }
  };

  const [isValidEmail, setIsValidEmail] = useState(false);

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  return (
    <>
      <JoinComp>
        <h2>회원가입</h2>
        <div className="container">
          {/* 프로필 사진 */}
          <div className="profile">
            <label>프로필 사진 업로드</label>
            <input
              type="file"
              accept="image/*"
              onChange={onChangeProfileImage}
            />
            {profileImage && (
              <div>
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="프로필 미리보기"
                  width="150px"
                  height="150px"
                />
              </div>
            )}
          </div>

          <div className="inputArea">
            <InputButton
              holder="이메일 입력"
              value={inputEmail}
              changeEvt={onChangeEmail}
              btnChild="인증번호 발송"
              active={isValidEmail}
              msg={emailMessage}
              msgType={isValidEmail}
              disabled={!isValidEmail}
              btnClick={sendEmailAuthCode}
            />
            <InputButton
              holder="이메일 인증번호 입력"
              value={inputEmailConf}
              changeEvt={onChangeEmailConf}
              btnChild="인증번호 확인"
              active={isEmailConf && isEmail}
              msg={emailConfMessage}
              msgType={isEmailConf}
              disabled={!inputEmailConf || !isValidEmail}
              btnClick={verifyEmailAuthCode}
            />
            <Input
              holder="비밀번호 입력"
              value={inputPw}
              type="password"
              changeEvt={onChangePw}
              msg={pwMessage}
              msgType={isPw}
            />
            <Input
              holder="비밀번호 확인"
              value={inputPw2}
              type="password"
              changeEvt={onChangePw2}
              msg={pw2Message}
              msgType={isPw2}
            />
            <Input
              holder="이름 입력"
              value={inputName}
              changeEvt={onChangeName}
              msg={nameMessage}
              msgType={isName}
            />
          </div>

          {/* 나이대 선택 */}
          <div className="select-age">
            <label>나이대 선택</label>
            <div className="age-group-grid">
              {ageGroups.map((group, index) => (
                <button
                  key={index}
                  className={`age-group-button ${
                    ageGroup === group ? "active" : ""
                  }`}
                  onClick={() => onChangeAgeGroup(group)}>
                  {group}
                </button>
              ))}
            </div>
            <p>{ageGroupMessage}</p>
          </div>

          <button
            className="submitButton"
            onClick={onSubmit}
            disabled={!isButtonActive}
            style={{
              backgroundColor: isButtonActive ? "blue" : "gray",
              color: "white",
              cursor: isButtonActive ? "pointer" : "not-allowed",
            }}>
            완료하기
          </button>
        </div>
      </JoinComp>
    </>
  );
};

export default Join;
