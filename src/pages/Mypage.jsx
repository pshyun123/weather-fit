import React from "react";
import { MyPageContainer } from "../component/mypage/MypageStyle";
import UserProfile from "../component/mypage/UserProfile";
import StyleGrid from "../component/mypage/StyleGrid";

const Mypage = () => {
  return (
    <MyPageContainer>
      <UserProfile />
      <StyleGrid />
    </MyPageContainer>
  );
};

export default Mypage;
