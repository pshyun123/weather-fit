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

  // 이미지가 있는 회원가입
  joinUserWithImage: async (formData) => {
    console.log("이미지 포함 회원가입 진입");
    return await axios.post(Common.WWEATHERFIT + "/auth/join", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 이미지가 없는 회원가입
  joinUser: async (userData) => {
    console.log("기본 회원가입 진입");
    return await axios.post(Common.WWEATHERFIT + "/auth/join", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // joinUser: async (email, password, name, profileImage, ageGroup) => {
  //   console.log("회원가입 진입 : " + email);
  //   const data = {
  //     email: email,
  //     password: password,
  //     name: name,
  //     profileImage: profileImage,
  //     ageGroup: ageGroup,
  //   };
  //   return await axios.post(Common.WEATHERFIT + "/auth/join", data);
  // },

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

  // 로그인 상태 확인
  checkLoginStatus: async () => {
    try {
      const response = await axios.get(
        Common.WWEATHERFIT + "/auth/login/check",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("로그인 상태 확인 응답:", response.data); // 응답 데이터 확인
      return response;
    } catch (error) {
      console.error("로그인 상태 확인 상세 에러:", error.response?.data); // 상세 에러 확인
      return {
        data: {
          success: false,
          profileImage: null,
          name: null,
          ageGroup: null,
          email: null,
        },
      };
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      const response = await axios.post(
        Common.WWEATHERFIT + "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  },
};

export default UserApi;
