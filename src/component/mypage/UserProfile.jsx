import React from "react";
import { ProfileSection, BasicInfoSection } from "./MypageStyle";
import snowyIcon from "../../assets/snowy.png";
import { useAuth } from "../../context/AuthContext";
import editIcon from "../../assets/editing.png";

const UserProfile = () => {
  const { userProfile } = useAuth();

  // userProfile이 null일 때 기본값 설정
  const defaultProfile = {
    profileImage: snowyIcon,
    name: "유저명",
    email: "유저이메일",
    preference: "미니멀",
    age_group: "20대 후반",
  };

  // userProfile이 null이면 defaultProfile 사용
  const profile = userProfile || defaultProfile;

  return (
    <BasicInfoSection>
      <ProfileSection>
        <div className="profile-image-header">프로필 설정</div>
        <div
          className="profile-container"
          style={{
            position: "relative",
            width: "114.31px",
            height: "114.31px",
          }}
        >
          <div
            className="profile-image"
            style={{
              width: "114.31px",
              height: "114.31px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={profile?.profileImage || snowyIcon}
              alt="프로필"
              style={{
                width: "242px",
                height: "260px",
                objectFit: "cover",
                paddingTop: "30px",
                paddingRight: "36px",
              }}
              onError={(e) => {
                console.error("이미지 로드 실패:", profile?.profileImage);
                e.target.src = snowyIcon;
              }}
            />
          </div>
          <div
            className="edit-button"
            style={{
              position: "absolute",
              right: "-8px",
              bottom: "-8px",
              border: "1px solid #262626",
              backgroundColor: "#ffffff",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <img
              src={editIcon}
              alt="수정"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
        </div>
        <div className="profile-info">
          <div className="name">{profile.name}</div>
        </div>
      </ProfileSection>

      <div className="basic-info-title">기본 정보</div>

      <div className="email-container">
        <div className="email-title">아이디</div>
        <div className="email">{profile.email}</div>
      </div>

      <div className="edit-container">
        <div className="edit-title">비밀번호</div>
        <div className="edit-content">********</div>
        <div
          className="info-edit-button"
          style={{
            position: "relative",
            marginLeft: "auto",
            border: "1px solid #262626",
            backgroundColor: "#ffffff",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <img
            src={editIcon}
            alt="수정"
            style={{
              width: "12px",
              height: "12px",
            }}
          />
        </div>
      </div>

      <div className="edit-container">
        <div className="edit-title">취향</div>
        <div className="edit-content">{profile.preference}</div>
        <div
          className="info-edit-button"
          style={{
            position: "relative",
            marginLeft: "auto",
            border: "1px solid #262626",
            backgroundColor: "#ffffff",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <img
            src={editIcon}
            alt="수정"
            style={{
              width: "12px",
              height: "12px",
            }}
          />
        </div>
      </div>

      <div className="edit-container">
        <div className="edit-title">연령대</div>
        <div className="edit-content">{profile.age_group}</div>
        <div
          className="info-edit-button"
          style={{
            position: "relative",
            marginLeft: "auto",
            border: "1px solid #262626",
            backgroundColor: "#ffffff",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <img
            src={editIcon}
            alt="수정"
            style={{
              width: "12px",
              height: "12px",
            }}
          />
        </div>
      </div>
    </BasicInfoSection>
  );
};

export default UserProfile;
