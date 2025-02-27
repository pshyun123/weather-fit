import React, { useRef, useState } from "react";
import { ProfileSection, BasicInfoSection } from "./MypageStyle";
import snowyIcon from "../../images/snowy.png";
import { useAuth } from "../../context/AuthContext";
import editIcon from "../../images/editing.png";
import UserApi from "../../api/UserApi";
import Common from "../../utils/Common";

const UserProfile = () => {
  const { userProfile, setUserProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

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

  // 이미지 수정 버튼 클릭 핸들러
  const handleEditImageClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 정보 로깅
    console.log("선택된 파일:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    });

    // 파일을 Base64로 변환하여 미리보기 표시 (UI 즉시 업데이트)
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageBase64 = event.target.result;
      setProfileImage(imageBase64);

      try {
        // JSON 방식으로 프로필 이미지 업데이트 (Base64 데이터 포함)
        const userData = {
          id: userProfile?.id,
          email: userProfile?.email,
          profileImage: imageBase64, // Base64 이미지 데이터 전송
          fileName: file.name, // 파일 이름도 함께 전송
        };

        // API 호출
        const response = await UserApi.updateProfileImage(userData);
        console.log("프로필 이미지 업데이트 성공:", response);

        // 사용자 프로필 상태 업데이트 (서버에서 반환한 이미지 URL 또는 Base64 데이터 사용)
        setUserProfile((prev) => ({
          ...prev,
          profileImage: response?.profileImage || imageBase64,
        }));
      } catch (error) {
        console.error("프로필 이미지 업데이트 실패:", error);
        alert("프로필 이미지 업데이트에 실패했습니다. 다시 시도해주세요.");
      }
    };
    reader.readAsDataURL(file);

    // 파일 입력 초기화 (같은 파일 재선택 가능하도록)
    e.target.value = "";
  };

  // 프로필 이미지 URL 확인 및 처리
  const getProfileImageSrc = () => {
    // 로컬 상태의 이미지가 있으면 우선 사용
    if (profileImage) {
      return profileImage;
    }

    if (!profile || !profile.profileImage) {
      return snowyIcon;
    }

    // Base64 이미지인 경우 그대로 사용
    if (profile.profileImage.startsWith("data:image")) {
      return profile.profileImage;
    }

    // 상대 경로인 경우 서버 URL과 결합
    if (profile.profileImage.startsWith("/")) {
      return `${Common.WWEATHERFIT}${profile.profileImage}`;
    }

    // 그 외의 경우 (파일명만 있는 경우 등) 서버 업로드 경로와 결합
    return `${Common.WWEATHERFIT}/uploads/${profile.profileImage}`;
  };

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
              width: "124px",
              height: "124px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 1)",
            }}
          >
            <img
              src={getProfileImageSrc()}
              alt="프로필"
              style={{
                width: "222px",
                height: "240px",
                objectFit: "cover",
                paddingTop: "30px",
                paddingRight: "30px",
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
              backgroundColor: "rgba(38, 38, 38, 1)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={handleEditImageClick}
          >
            <img
              src={editIcon}
              alt="수정"
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "2.2px",
                marginBottom: "2px",
              }}
            />
          </div>

          {/* 파일 선택 input (숨김) */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
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
            backgroundColor: "rgba(143,143,143,1)",
            width: "25px",
            height: "25px",
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
              width: "15px",
              height: "15px",
              marginLeft: "2.2px",
              marginBottom: "2px",
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
            backgroundColor: "rgba(143,143,143,1)",
            width: "25px",
            height: "25px",
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
              width: "15px",
              height: "15px",
              marginLeft: "2.2px",
              marginBottom: "2px",
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
            backgroundColor: "rgba(143,143,143,1)",
            width: "25px",
            height: "25px",
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
              width: "15px",
              height: "15px",
              marginLeft: "2.2px",
              marginBottom: "2px",
            }}
          />
        </div>
      </div>
    </BasicInfoSection>
  );
};

export default UserProfile;
