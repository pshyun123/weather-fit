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

const LoginApi = {
  login: async (email, password) => {
    try {
      const credentials = {
        email,
        password,
      };

      const response = await axiosInstance.post("/auth/login", credentials);
      console.log("로그인 응답:", response.data);
      console.log("Set-Cookie:", response.headers["set-cookie"]);

      return response;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },
};

export default LoginApi;
