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
        preferences: response.data.preferences,
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

  // 프로필 취향 업데이트
  updateProfileTaste: async (userData) => {
    console.log("프로필 취향 업데이트 요청 시작 (JSON 방식)");
    return await jsonInstance.post("/member/update/preferences", userData);
  },

  // 프로필 연령대 업데이트
  updateProfileAgegroup: async (userData) => {
    console.log("프로필 연령대 업데이트 요청 시작 (JSON 방식)");
    console.log("요청 데이터:", userData);

    try {
      // 서버 API 엔드포인트에 맞게 데이터 형식 조정
      const requestData = {
        id: userData.id,
        email: userData.email,
        ageGroup: userData.agegroup, // 서버에서 ageGroup으로 받는 경우
      };

      console.log("변환된 요청 데이터:", requestData);

      const response = await jsonInstance.post(
        "/member/update/ageGroup",
        requestData
      );
      console.log("연령대 업데이트 응답:", response.data);
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

  // 현재 비밀번호 확인
  verifyPassword: async (userData) => {
    console.log("현재 비밀번호 확인 요청 시작");
    console.log("요청 데이터:", {
      email: userData.email,
      password: "********", // 비밀번호는 로그에 표시하지 않음
    });

    try {
      // 요청 데이터에서 필요한 필드만 추출하여 새 객체 생성
      const requestData = {
        email: userData.email,
        password: userData.password,
      };

      const response = await jsonInstance.post(
        "/member/verify/password",
        requestData
      );
      console.log("비밀번호 확인 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("비밀번호 확인 실패:", error);
      throw error;
    }
  },

  // 비밀번호 업데이트
  updatePassword: async (userData) => {
    console.log("비밀번호 업데이트 요청 시작");
    console.log("요청 데이터:", {
      ...userData,
      password: "********", // 비밀번호는 로그에 표시하지 않음
    });

    try {
      const response = await jsonInstance.post(
        "/member/update/password",
        userData
      );
      console.log("비밀번호 업데이트 응답:", response.data);
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

  // 좋아요 추가
  addLike: async (userId, coordinateId) => {
    console.log("좋아요 추가 요청 시작");
    console.log("요청 데이터:", { userId, coordinateId });

    try {
      const response = await jsonInstance.post("/member/like/add", {
        userId: userId,
        coordinateId: coordinateId,
      });
      console.log("좋아요 추가 응답:", response.data);
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

  // 좋아요 삭제
  deleteLike: async (userId, coordinateId) => {
    console.log("좋아요 삭제 요청 시작");
    console.log("요청 데이터:", { userId, coordinateId });

    try {
      const response = await jsonInstance.delete("/member/like/delete", {
        data: {
          userId: userId,
          coordinateId: coordinateId,
        },
      });
      console.log("좋아요 삭제 응답:", response.data);
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

  // 사용자의 좋아요 중 미니멀 스타일만 가져오기
  getMinimalLikes: async (userId) => {
    console.log("미니멀 스타일 좋아요 목록 요청 시작");
    console.log("요청 데이터:", { userId });

    try {
      const response = await jsonInstance.get(`/member/like/minimal`, {
        params: { userId },
      });
      console.log("미니멀 스타일 좋아요 목록 응답:", response.data);
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

  // 사용자의 좋아요 중 모던 스타일만 가져오기
  getModernLikes: async (userId) => {
    console.log("모던 스타일 좋아요 목록 요청 시작");
    console.log("요청 데이터:", { userId });

    try {
      const response = await jsonInstance.get(`/member/like/modern`, {
        params: { userId },
      });
      console.log("모던 스타일 좋아요 목록 응답:", response.data);
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

  // 사용자의 좋아요 중 캐주얼 스타일만 가져오기
  getCasualLikes: async (userId) => {
    console.log("캐주얼 스타일 좋아요 목록 요청 시작");
    console.log("요청 데이터:", { userId });

    try {
      const response = await jsonInstance.get(`/member/like/casual`, {
        params: { userId },
      });
      console.log("캐주얼 스타일 좋아요 목록 응답:", response.data);
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

  // 사용자의 좋아요 중 스트릿 스타일만 가져오기
  getStreetLikes: async (userId) => {
    console.log("스트릿 스타일 좋아요 목록 요청 시작");
    console.log("요청 데이터:", { userId });

    try {
      const response = await jsonInstance.get(`/member/like/street`, {
        params: { userId },
      });
      console.log("스트릿 스타일 좋아요 목록 응답:", response.data);
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

  // 사용자의 좋아요 중 러블리 스타일만 가져오기
  getLivelyLikes: async (userId) => {
    console.log("러블리 스타일 좋아요 목록 요청 시작");
    console.log("요청 데이터:", { userId });

    try {
      const response = await jsonInstance.get(`/member/like/lively`, {
        params: { userId },
      });
      console.log("러블리 스타일 좋아요 목록 응답:", response.data);
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

  // 사용자의 좋아요 중 럭셔리 스타일만 가져오기
  getLuxuryLikes: async (userId) => {
    console.log("럭셔리 스타일 좋아요 목록 요청 시작");
    console.log("요청 데이터:", { userId });

    try {
      const response = await jsonInstance.get(`/member/like/luxury`, {
        params: { userId },
      });
      console.log("럭셔리 스타일 좋아요 목록 응답:", response.data);
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
