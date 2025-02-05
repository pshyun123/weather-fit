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

  // 회원 가입
  joinUser: async (email, Password, name, profileImage, ageGroup) => {
    console.log("회원가입 진입 : " + email);
    const data = {
      email: email,
      Password: Password,
      name: name,
      profileImage: profileImage,
      ageGroup: ageGroup,
    };
    return await axios.post(Common.WWEATHERFIT + "/auth/join", data);
  },
};

export default UserApi;
