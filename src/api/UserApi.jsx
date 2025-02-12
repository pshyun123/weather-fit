import axios from "axios";
import Common from "../utils/Common";

const UserApi = {
  // 이메일 인증 코드 발송
  sendAuthCode: async (email) => {
    console.log("이메일 인증 코드 발송: " + email);
    return await axios.post(Common.WEATHERFIT + "/email/send", { email });
  },

  // 이메일 인증 코드 확인
  verifyAuthCode: async (email, code) => {
    console.log("이메일 인증 코드 확인: " + email);
    return await axios.post(Common.WEATHERFIT + "/email/verify", {
      email,
      code,
    });
  },

  // 중복 체크
  checkUnique: async (type, data) => {
    console.log("중복체크 진입 : " + data);
    const dataMap = {
      type: type,
      data: data,
    };
    return await axios.post(Common.WEATHERFIT + "/auth/isunique", dataMap);
  },

  // 회원 가입
  joinUser: async (email, password, name, profileImage, ageGroup) => {
    console.log("회원가입 진입 : " + email);
    const data = {
      email: email,
      password: password,
      name: name,
      profileImage: profileImage,
      ageGroup: ageGroup,
    };
    return await axios.post(Common.WEATHERFIT + "/auth/join", data);
  },
};

export default UserApi;
