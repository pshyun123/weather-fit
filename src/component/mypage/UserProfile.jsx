import React from "react";
import { ProfileSection } from "./MypageStyle";

import userIcon from "../../assets/header_person.png";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { userProfile } = useAuth();

  // userProfile이 null일 때 기본값 설정
  const defaultProfile = {
    profileImage: userIcon,
    name: "",
    email: "",
  };

  // userProfile이 null이면 defaultProfile 사용
  const profile = userProfile || defaultProfile;

  return (
    <ProfileSection>
      <div className="profile-image">
        <img
          src={profile?.profileImage || userIcon}
          width={150}
          height={150}
          alt="프로필"
          onError={(e) => {
            console.error("이미지 로드 실패:", profile?.profileImage);
            e.target.src = userIcon;
          }}
        />
      </div>
      <div className="profile-image-button">
        <button>수정하기</button>
      </div>
      <div className="profile-info">
        <div className="name">{profile.name}</div>
        <div className="email">{profile.email}</div>
      </div>
    </ProfileSection>
  );
};

export default UserProfile;
