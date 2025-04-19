import axios from "axios";
import Common from "../utils/Common";

// JSON 요청을 위한 인스턴스
const jsonInstance = axios.create({
  baseURL: Common.WWEATHERFIT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const CoordinateApi = {
  // 착장 정보 전체 조회
  getCoordinateList: async () => {
    console.log("착장 정보 전체 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/list");
      console.log("착장 정보 전체 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("착장 정보 전체 조회 실패:", error);
      throw error;
    }
  },

  // 모든 취향 목록 조회
  getPreferenceList: async () => {
    console.log("취향 목록 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/preference");
      console.log("취향 목록 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("취향 목록 조회 실패:", error);
      throw error;
    }
  },

  // 미니멀 취향 착장 조회
  getMinimalPreferenceList: async () => {
    console.log("미니멀 취향 착장 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/preference/minimal");
      console.log("미니멀 취향 착장 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("미니멀 취향 착장 조회 실패:", error);
      throw error;
    }
  },

  // 모던 취향 착장 조회
  getModernPreferenceList: async () => {
    console.log("모던 취향 착장 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/preference/modern");
      console.log("모던 취향 착장 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("모던 취향 착장 조회 실패:", error);
      throw error;
    }
  },

  // 캐주얼 취향 착장 조회
  getCasualPreferenceList: async () => {
    console.log("캐주얼 취향 착장 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/preference/casual");
      console.log("캐주얼 취향 착장 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("캐주얼 취향 착장 조회 실패:", error);
      throw error;
    }
  },

  // 스트릿 취향 착장 조회
  getStreetPreferenceList: async () => {
    console.log("스트릿 취향 착장 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/preference/street");
      console.log("스트릿 취향 착장 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("스트릿 취향 착장 조회 실패:", error);
      throw error;
    }
  },

  // 러블리 취향 착장 조회
  getLivelyPreferenceList: async () => {
    console.log("러블리 취향 착장 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/preference/lively");
      console.log("러블리 취향 착장 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("러블리 취향 착장 조회 실패:", error);
      throw error;
    }
  },

  // 럭셔리 취향 착장 조회
  getLuxuryPreferenceList: async () => {
    console.log("럭셔리 취향 착장 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/preference/luxury");
      console.log("럭셔리 취향 착장 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("럭셔리 취향 착장 조회 실패:", error);
      throw error;
    }
  },

  /////// 착장 정보 중 tpo 조회.
  getTpoList: async () => {
    console.log("tpo 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo");
      console.log("tpo 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("tpo 조회 실패:", error);
      throw error;
    }
  },

  // 데일리룩 TPO 조회
  getDailyTpoList: async () => {
    console.log("데일리룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/daily");
      console.log("데일리룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("데일리룩 TPO 조회 실패:", error);
      throw error;
    }
  },

  // 미팅룩 TPO 조회
  getMeetingTpoList: async () => {
    console.log("미팅룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/meeting");
      console.log("미팅룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("미팅룩 TPO 조회 실패:", error);
      throw error;
    }
  },

  // 데이트룩 TPO 조회
  getDateTpoList: async () => {
    console.log("데이트룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/date");
      console.log("데이트룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("데이트룩 TPO 조회 실패:", error);
      throw error;
    }
  },

  // 운동룩 TPO 조회
  getExerciseTpoList: async () => {
    console.log("운동룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/exercise");
      console.log("운동룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("운동룩 TPO 조회 실패:", error);
      throw error;
    }
  },

  // 출근룩 TPO 조회
  getWorkTpoList: async () => {
    console.log("출근룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/work");
      console.log("출근룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("출근룩 TPO 조회 실패:", error);
      throw error;
    }
  },

  // 파티룩 TPO 조회
  getPartyTpoList: async () => {
    console.log("파티룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/party");
      console.log("파티룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("파티룩 TPO 조회 실패:", error);
      throw error;
    }
  },

  // 여행룩 TPO 조회
  getTravelTpoList: async () => {
    console.log("여행룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/travel");
      console.log("여행룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("여행룩 TPO 조회 실패:", error);
      throw error;
    }
  },

  // 웨딩룩 TPO 조회
  getWeddingTpoList: async () => {
    console.log("웨딩룩 TPO 조회 요청 시작");
    try {
      const response = await jsonInstance.get("/coordinate/tpo/wedding");
      console.log("웨딩룩 TPO 조회 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("웨딩룩 TPO 조회 실패:", error);
      throw error;
    }
  },
};

export default CoordinateApi;
