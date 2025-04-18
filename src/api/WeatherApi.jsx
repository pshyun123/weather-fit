import axios from "axios";
import Common from "../utils/Common";

// API 설정
const axiosInstance = axios.create({
  baseURL: Common.WWEATHERFIT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 현재 날씨 정보를 가져오는 함수
export const getCurrentWeather = async () => {
  try {
    console.log("현재 날씨 정보 요청");
    const response = await axiosInstance.get("/weather/current");
    console.log("현재 날씨 정보 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("현재 날씨 정보 요청 실패:", error);
    throw error;
  }
};

// 날씨 예보 정보를 가져오는 함수
export const getWeatherForecast = async () => {
  try {
    console.log("날씨 예보 정보 요청");
    const response = await axiosInstance.get("/weather/forecast");

    // 응답 데이터 로깅 시 주요 필드 정보 함께 표시
    const forecastData = response.data;
    console.log("날씨 예보 정보 응답:", forecastData);

    if (forecastData && forecastData.length > 0) {
      console.log("첫 번째 예보 데이터 샘플:", {
        날짜: forecastData[0].forecastDate,
        시간: forecastData[0].forecastTime,
        기온: forecastData[0].forecastTemp,
        최저기온: forecastData[0].forecastTempMin,
        최고기온: forecastData[0].forecastTempMax,
        날씨상태: forecastData[0].forecastWeatherCondition,
        설명: forecastData[0].forecastDescription,
        위치: forecastData[0].forecastLocationName,
      });
    }

    return forecastData;
  } catch (error) {
    console.error("날씨 예보 정보 요청 실패:", error);
    throw error;
  }
};

// 날씨 정보를 기반으로 스타일 추천을 가져오는 함수
export const getWeatherBasedStyles = async (weatherCondition) => {
  try {
    console.log(`${weatherCondition} 날씨 기반 스타일 요청`);
    const response = await axiosInstance.get(
      `/styles/weather/${weatherCondition}`
    );
    console.log(`${weatherCondition} 날씨 기반 스타일 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${weatherCondition} 날씨 기반 스타일 요청 실패:`, error);
    throw error;
  }
};

// 날씨 정보를 기반으로 좋아요한 스타일을 가져오는 함수
export const getWeatherBasedLikes = async (weatherCondition) => {
  try {
    console.log(`${weatherCondition} 날씨 기반 좋아요 스타일 요청`);
    const response = await axiosInstance.get(
      `/styles/weather/${weatherCondition}/likes`
    );
    console.log(
      `${weatherCondition} 날씨 기반 좋아요 스타일 응답:`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      `${weatherCondition} 날씨 기반 좋아요 스타일 요청 실패:`,
      error
    );
    throw error;
  }
};

// 날씨 정보를 기반으로 스타일 좋아요/좋아요 취소 함수
export const toggleWeatherStyleLike = async (styleId, weatherCondition) => {
  try {
    console.log(
      `${styleId} 스타일 좋아요 토글 요청 (${weatherCondition} 날씨)`
    );
    const response = await axiosInstance.post(
      `/styles/weather/${weatherCondition}/${styleId}/like`
    );
    console.log(`${styleId} 스타일 좋아요 토글 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${styleId} 스타일 좋아요 토글 요청 실패:`, error);
    throw error;
  }
};
import axios from "axios";
import Common from "../utils/Common";

// API 설정
const axiosInstance = axios.create({
  baseURL: Common.WWEATHERFIT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 현재 날씨 정보를 가져오는 함수
export const getCurrentWeather = async () => {
  try {
    console.log("현재 날씨 정보 요청");
    const response = await axiosInstance.get("/weather/current");
    console.log("현재 날씨 정보 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("현재 날씨 정보 요청 실패:", error);
    throw error;
  }
};

// 날씨 예보 정보를 가져오는 함수
export const getWeatherForecast = async () => {
  try {
    console.log("날씨 예보 정보 요청");
    const response = await axiosInstance.get("/weather/forecast");

    // 응답 데이터 로깅 시 주요 필드 정보 함께 표시
    const forecastData = response.data;
    console.log("날씨 예보 정보 응답:", forecastData);

    if (forecastData && forecastData.length > 0) {
      console.log("첫 번째 예보 데이터 샘플:", {
        날짜: forecastData[0].forecastDate,
        시간: forecastData[0].forecastTime,
        기온: forecastData[0].forecastTemp,
        최저기온: forecastData[0].forecastTempMin,
        최고기온: forecastData[0].forecastTempMax,
        날씨상태: forecastData[0].forecastWeatherCondition,
        설명: forecastData[0].forecastDescription,
        위치: forecastData[0].forecastLocationName,
      });
    }

    return forecastData;
  } catch (error) {
    console.error("날씨 예보 정보 요청 실패:", error);
    throw error;
  }
};

// 현재 날씨 조건과 사용자의 선호 스타일을 기반으로 랜덤 스타일을 추천하는 함수
export const getCurrentWeatherBasedRandomStyles = async (userId) => {
  try {
    console.log(`현재 날씨 기반 랜덤 스타일 추천 요청: userId=${userId}`);
    const response = await axiosInstance.get(
      `/styles/current/random?userId=${userId}`
    );

    // 응답 데이터 로깅
    const styles = response.data;
    console.log("현재 날씨 기반 랜덤 스타일 추천 응답:", styles);

    if (styles && styles.length > 0) {
      console.log("첫 번째 추천 스타일 샘플:", {
        스타일ID: styles[0].id,
        스타일명: styles[0].name,
        이미지URL: styles[0].imageUrl,
        날씨조건: styles[0].weatherCondition,
        설명: styles[0].description,
      });
    }

    return styles;
  } catch (error) {
    console.error("현재 날씨 기반 랜덤 스타일 추천 요청 실패:", error);
    throw error;
  }
};

// 날씨 정보를 기반으로 스타일 추천을 가져오는 함수
export const getWeatherBasedStyles = async (weatherCondition) => {
  try {
    console.log(`${weatherCondition} 날씨 기반 스타일 요청`);
    const response = await axiosInstance.get(
      `/styles/weather/${weatherCondition}`
    );
    console.log(`${weatherCondition} 날씨 기반 스타일 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${weatherCondition} 날씨 기반 스타일 요청 실패:`, error);
    throw error;
  }
};

// 날씨 정보를 기반으로 좋아요한 스타일을 가져오는 함수
export const getWeatherBasedLikes = async (weatherCondition) => {
  try {
    console.log(`${weatherCondition} 날씨 기반 좋아요 스타일 요청`);
    const response = await axiosInstance.get(
      `/styles/weather/${weatherCondition}/likes`
    );
    console.log(
      `${weatherCondition} 날씨 기반 좋아요 스타일 응답:`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      `${weatherCondition} 날씨 기반 좋아요 스타일 요청 실패:`,
      error
    );
    throw error;
  }
};

// 날씨 정보를 기반으로 스타일 좋아요/좋아요 취소 함수
export const toggleWeatherStyleLike = async (styleId, weatherCondition) => {
  try {
    console.log(
      `${styleId} 스타일 좋아요 토글 요청 (${weatherCondition} 날씨)`
    );
    const response = await axiosInstance.post(
      `/styles/weather/${weatherCondition}/${styleId}/like`
    );
    console.log(`${styleId} 스타일 좋아요 토글 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${styleId} 스타일 좋아요 토글 요청 실패:`, error);
    throw error;
  }
};
