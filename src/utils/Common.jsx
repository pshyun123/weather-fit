import axios from "axios";

// 공통 api(common)
const Common = axios.create({
  WEATHERFIT_URL: "",
  header: {
    "content-Type": "application/json",
  },
  withCredentials: true,
});

export default Common;
