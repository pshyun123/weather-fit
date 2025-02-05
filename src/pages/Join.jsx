import { useState } from "react";
import UserApi from "../api/UserApi";
import JoinComp from "../component/join/JoinStyle";
import { InputButton } from "../component/join/JoinInputstyle";

const Join = () => {
  // 입력 칸에 이메일, 이메일 인증, 비밀번호, 이름 입력 / 프로필, 나이대별 선택
  const [inputEmail, setInputEmail] = useState(""); // 이메일
  const [emailConf, setEmailConf] = useState(""); // 이메일 인증
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

  // 이메일, 비밀번호 정규식
  const regexList = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?])[A-Za-z\d@$!%_*?]{8,15}$/,
  };

  const isUnique = async (type, value) => {
    try {
      const res = await UserApi.checkUnique(type, value);
      if (!res.data) {
        setEmailMessage("사용 가능합니다.");
        setIsEmail(true);
      } else {
        setEmailMessage("이미 사용 중입니다.");
        setIsEmail(false);
      }
    } catch (err) {
      console.error("중복 검사 실패:", err);
    }
  };

  // 이메일
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value);
    if (!regexList.email.test(value)) {
      setEmailMessage("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      isUnique("email", value);
    }
  };

  // 이메일 인증번호 요청
  const sendEmailAuthCode = async () => {
    try {
      const res = await UserApi.sendAuthCode(inputEmail); // API 호출
      if (res.data.success) {
        setEmailConfMessage("인증번호가 발송되었습니다.");
      } else {
        setEmailConfMessage("인증번호 발송 실패.");
      }
    } catch (error) {
      console.error("인증번호 요청 실패:", error);
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

  // 프로필 사진
  const onChangeProfileImage = (e) => {
    const file = e.target.files[0]; // 선택한 파일
    if (file) {
      setProfileImage(file);
      setProfileImageMessage("프로필 이미지가 업로드되었습니다.");
    } else {
      setProfileImageMessage("이미지를 선택하세요.");
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
  ]; // 나이대 목록

  const onChangeAgeGroup = (e) => {
    setAgeGroup(e.target.value);
    setAgeGroupMessage("나이대가 선택되었습니다.");
    setIsAgeGroup(true);
  };

  const onSubmit = async () => {
    if (
      isEmail &&
      isEmailConf &&
      isPw &&
      isPw2 &&
      isName &&
      isProfileImage &&
      isAgeGroup
    ) {
      try {
        const res = await UserApi.register({
          email: inputEmail,
          password: inputPw,
          name: inputName,
        });
        console.log("회원가입 성공:", res.data);
      } catch (error) {
        console.error("회원가입 실패:", error);
      }
    } else {
      console.error("입력 값을 확인하세요.");
    }
  };

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
            <p>{profileImageMessage}</p>
          </div>

          <div className="inputArea">
            <InputButton
              holder="이메일 입력"
              value={inputEmail}
              changeEvt={onChangeEmail}
              btnChild="인증번호 발송"
              active={isEmail}
              msg={emailMessage}
              msgType={isEmail}
              btnClick={sendEmailAuthCode} // 버튼 클릭 시 인증번호 발송 요청
            />
            <InputButton
              holder="비밀번호 입력"
              value={inputPw}
              type="password"
              changeEvt={onChangePw}
              msg={pwMessage}
              msgType={isPw}
            />
            <InputButton
              holder="비밀번호 확인"
              value={inputPw2}
              type="password"
              changeEvt={onChangePw2}
              msg={pw2Message}
              msgType={isPw2}
            />
            <InputButton
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
            <select value={ageGroup} onChange={onChangeAgeGroup}>
              <option value="">나이대를 선택하세요</option>
              {ageGroups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <p>{ageGroupMessage}</p>
          </div>

          <button
            onClick={onSubmit}
            disabled={
              !(
                isEmail &&
                isEmailConf &&
                isPw &&
                isPw2 &&
                isName &&
                isProfileImage &&
                isAgeGroup
              )
            }>
            완료하기
          </button>
        </div>
      </JoinComp>
    </>
  );
};

export default Join;
