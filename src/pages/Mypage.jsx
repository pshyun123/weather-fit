import React from "react";
import { MyPageBoard, MyPageContainer } from "../component/mypage/MypageStyle";
import UserProfile from "../component/mypage/UserProfile";
import StyleGrid from "../component/mypage/StyleGrid";

const Mypage = () => {
  return (
    <MyPageBoard>
      <MyPageContainer>
        <UserProfile />
        <StyleGrid />
      </MyPageContainer>
    </MyPageBoard>
  );
};

export default Mypage;
