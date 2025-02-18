import React, { useEffect, useState } from "react";
import { ProfileSection } from "./MypageStyle";
import UserApi from "../../api/UserApi";
import userIcon from "../../assets/header_person.png";

const UserProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    profileImage: null,
    name: "",
    email: "",
  });

  // 로그인 상태 및 사용자 정보 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await UserApi.checkLoginStatus();
        console.log("로그인 상태 확인 응답:", res.data);

        if (res.data && res.data.success) {
          setIsLoggedIn(true);
          const profileUrl = res.data.profileImage?.startsWith("/")
            ? res.data.profileImage.substring(1)
            : res.data.profileImage;

          setUserProfile({
            profileImage: profileUrl,
            name: res.data.name,
            email: res.data.email,
          });
        } else {
          setIsLoggedIn(false);
          setUserProfile({
            profileImage: null,
            name: "",
            email: "",
          });
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setIsLoggedIn(false);
        setUserProfile({
          profileImage: null,
          name: "",
          email: "",
        });
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <ProfileSection>
      <div className="profile-image">
        <img
          src={userProfile.profileImage || userIcon}
          alt="프로필"
          onError={(e) => {
            console.error("이미지 로드 실패:", userProfile.profileImage);
            e.target.src = userIcon;
          }}
        />
      </div>
      <div className="profile-image-button">
        <button>수정하기</button>
      </div>
      <div className="profile-info">
        <div className="name">{userProfile.name}</div>
        <div className="email">{userProfile.email}</div>
      </div>
    </ProfileSection>
  );
};

export default UserProfile;
