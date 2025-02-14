import axios from "axios";
import Common from "../utils/Common";

const LoginApi = {
  login: async (email, password) => {
    console.log("로그인 진입 : " + email);
    const data = {
      email: email,
      password: password,
    };
    return await axios.post(Common.WWEATHERFIT + "/auth/login", data);
  },
};

export default LoginApi;
