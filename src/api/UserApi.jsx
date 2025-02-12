import axios from "axios";
import Common from "../utils/Common";

const UserApi = {
  // 중복 체크
  checkUnique: async (type, data) => {
    console.log("중복체크 진입 : " + data);
    const dataMap = {
      type: type,
      data: data,
    };
    return await axios.post(Common.WWEATHERFIT + "/auth/isunique", dataMap);
  },

  // 회원 가입
  joinUser: async (email, Password, name, profileImage, ageGroup) => {
    console.log("회원가입 진입 : " + email);
    const data = {
      email: email,
      Password: Password,
      name: name,
      profileImage: profileImage,
      ageGroup: ageGroup,
    };
    return await axios.post(Common.WWEATHERFIT + "/auth/join", data);
  },

  // 이메일 인증
  emailAuth: async (email) => {
    console.log("이메일 인증 진입 : " + email);
    const data = {
      email: email,
    };
    return await axios.post(Common.WWEATHERFIT + "/auth/email/verify", data);
  },

  // 이메일 인증 코드 확인
  emailAuthCheck: async (email, code) => {
    console.log("인증번호 확인 요청 데이터:", { email, code });
    const data = {
      email: email,
      code: code,
    };
    return await axios.post(Common.WWEATHERFIT + "/auth/email/check", data);
  },
};

export default UserApi;
