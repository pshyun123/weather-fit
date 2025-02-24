import Common from "../utils/Common";
import axios from "axios";

// API 설정
const axiosInstance = axios.create({
  baseURL: Common.WWEATHERFIT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const LoginApi = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log("로그인 요청 응답:", response);
      return response;
    } catch (error) {
      console.error("로그인 요청 실패:", error.response || error);
      throw error;
    }
  },
};

export default LoginApi;
