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
};

export default CoordinateApi;
