import axios from "axios";
import Common from "../utils/Common";

// 기본 API 설정
// const axiosInstance = axios.create({
//   baseURL: Common.WWEATHERFIT,
//   withCredentials: true,
// });

// JSON 요청을 위한 인스턴스
const jsonInstance = axios.create({
  baseURL: Common.WWEATHERFIT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const UserApi = {
  // 중복 체크
  checkUnique: async (type, data) => {
    console.log("중복체크 진입 : " + data);
    const dataMap = {
      type: type,
      data: data,
    };
    return await jsonInstance.post("/auth/isunique", dataMap);
  },

  // // 이미지가 있는 회원가입
  // joinUserWithImage: async (formData) => {
  //   console.log("이미지 포함 회원가입 진입");
  //   return await axiosInstance.post("/auth/join", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // },

  // 이미지가 없는 회원가입
  joinUser: async (userData) => {
    console.log("기본 회원가입 진입");
    // 요청 전 데이터 구조 확인을 위한 로그 추가
    console.log("회원가입 요청 데이터:", userData);

    return await jsonInstance.post("/auth/join", userData);
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
    return await jsonInstance.post("/auth/email/verify", { email });
  },

  // 이메일 인증 코드 확인
  emailAuthCheck: async (email, code) => {
    console.log("인증번호 확인 요청 데이터:", { email, code });
    return await jsonInstance.post("/auth/email/check", { email, code });
  },

  // 로그인 상태 확인
  checkLoginStatus: async () => {
    try {
      const response = await jsonInstance.get("/auth/login/check");
      console.log("로그인 체크 요청 전 데이터:", response);

      // 응답 데이터 구조 확인을 위한 로깅 추가
      console.log("로그인 상태 응답 데이터 구조:", {
        success: response.data.success,
        name: response.data.name,
        email: response.data.email,
        profileImage: response.data.profileImage,
        ageGroup: response.data.ageGroup,
      });

      return response;
    } catch (error) {
      console.error("로그인 상태 확인 실패:", error);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      const response = await jsonInstance.post("/auth/logout");
      return response;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  },

  // 프로필 이미지 업데이트 (JSON 방식)
  updateProfileImage: async (userData) => {
    console.log("프로필 이미지 업데이트 요청 시작 (JSON 방식)");
    // 이미지 데이터가 너무 길어 로그가 복잡해지지 않도록 이미지 데이터는 로깅에서 생략
    console.log("요청 데이터:", {
      ...userData,
      profileImage: userData.profileImage ? "(Base64 이미지 데이터)" : null,
    });

    try {
      // JSON 형식으로 프로필 이미지 데이터 업데이트
      const response = await jsonInstance.post(
        "/member/update/profileImage",
        userData
      );
      console.log("프로필 이미지 업데이트 응답:", {
        ...response.data,
        profileImage: response.data?.profileImage ? "(이미지 데이터)" : null,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else {
        console.error("요청 오류:", error.message);
      }
      throw error;
    }
  },
};

export default UserApi;
