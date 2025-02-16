import axios from "axios";
import Common from "../utils/Common";

const LoginApi = {
  login: async (email, password) => {
    try {
      console.log("로그인 진입 : " + email);
      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        Common.WWEATHERFIT + "/auth/login",
        data,
        {
          withCredentials: true, // 쿠키를 포함하여 요청
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("로그인 응답:", response.data);
      return response;
    } catch (error) {
      console.error("로그인 에러:", error.response?.data);
      throw error;
    }
  },
};

export default LoginApi;
