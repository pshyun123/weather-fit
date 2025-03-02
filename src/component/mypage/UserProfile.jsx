import React, { useRef, useState } from "react";
import { ProfileSection, BasicInfoSection } from "./MypageStyle";
import snowyIcon from "../../images/snowy.png";
import { useAuth } from "../../context/AuthContext";
import editIcon from "../../images/editing.png";
import UserApi from "../../api/UserApi";
import Common from "../../utils/Common";
import PreferenceModal from "../modal/PreferenceModal";
import AgeGroupModal from "../modal/AgeGroupModal";
import PasswordCheckModal from "../modal/PasswordCheckModal";
import NewPasswordModal from "../modal/NewPasswordModal";

const UserProfile = () => {
  const { userProfile, setUserProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [showAgegroupModal, setShowAgegroupModal] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedAgegroup, setSelectedAgegroup] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // userProfile이 null일 때 기본값 설정
  const defaultProfile = {
    profileImage: snowyIcon,
    name: "유저명",
    email: "유저이메일",
    preferences: "미니멀",
    ageGroup: "20대 후반",
  };

  // userProfile이 null이면 defaultProfile 사용
  const profile = userProfile || defaultProfile;

  // 컴포넌트 마운트 시 현재 사용자 취향 설정
  React.useEffect(() => {
    if (profile?.preferences) {
      try {
        if (
          typeof profile.preferences === "string" &&
          profile.preferences.startsWith("[")
        ) {
          const parsedPreferences = JSON.parse(profile.preferences);
          if (Array.isArray(parsedPreferences)) {
            setSelectedPreferences(parsedPreferences);
          } else {
            setSelectedPreferences([profile.preferences]);
          }
        } else if (Array.isArray(profile.preferences)) {
          setSelectedPreferences(profile.preferences);
        } else if (profile.preferences) {
          setSelectedPreferences([profile.preferences]);
        }
      } catch (error) {
        console.error("취향 데이터 파싱 오류:", error);
        setSelectedPreferences([]);
      }
    }
  }, [profile?.preferences]);

  // 이미지 수정 버튼 클릭 핸들러
  const handleEditImageClick = () => {
    fileInputRef.current.click();
  };

  // 취향 수정 버튼 클릭 핸들러
  const handleEditPreferenceClick = () => {
    setShowPreferenceModal(true);
  };

  // 취향 선택 핸들러
  const handlePreferenceSelect = (preference) => {
    if (selectedPreferences.includes(preference)) {
      // 이미 선택된 경우 제거
      setSelectedPreferences(
        selectedPreferences.filter((pref) => pref !== preference)
      );
    } else {
      // 선택되지 않은 경우 추가 (최대 2개까지)
      if (selectedPreferences.length < 2) {
        setSelectedPreferences([...selectedPreferences, preference]);
      } else {
        // 이미 2개 선택된 경우 첫 번째 항목 제거하고 새 항목 추가
        setSelectedPreferences([selectedPreferences[1], preference]);
      }
    }
  };

  // 취향 저장 핸들러
  const handleSavePreferences = async () => {
    try {
      // 취향 업데이트 API 호출
      const userData = {
        id: userProfile?.id,
        email: userProfile?.email,
        preferences: selectedPreferences,
      };

      const response = await UserApi.updateProfileTaste(userData);
      console.log("취향 업데이트 성공:", response);

      // 사용자 프로필 상태 업데이트
      setUserProfile((prev) => ({
        ...prev,
        preferences: selectedPreferences,
      }));

      // 모달 닫기
      setShowPreferenceModal(false);
    } catch (error) {
      console.error("취향 업데이트 실패:", error);
      alert("취향 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 연령대 수정 버튼 클릭 핸들러
  const handleEditAgegroupClick = () => {
    // 현재 연령대 설정
    if (profile?.agegroup) {
      setSelectedAgegroup(profile.agegroup);
    }
    setShowAgegroupModal(true);
  };

  // 연령대 저장 핸들러
  const handleSaveAgegroup = async (agegroup) => {
    try {
      console.log("선택된 연령대:", agegroup);

      // 연령대 업데이트 API 호출
      const userData = {
        id: userProfile?.id,
        email: userProfile?.email,
        agegroup: agegroup, // 클라이언트에서는 소문자로 사용
      };

      console.log("연령대 업데이트 요청 데이터:", userData);
      const response = await UserApi.updateProfileAgegroup(userData);
      console.log("연령대 업데이트 성공:", response);

      // 사용자 프로필 상태 업데이트
      setUserProfile((prev) => ({
        ...prev,
        agegroup: agegroup,
      }));

      // 모달 닫기
      setShowAgegroupModal(false);
    } catch (error) {
      console.error("연령대 업데이트 실패:", error);
      alert("연령대 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 비밀번호 수정 버튼 클릭 핸들러
  const handleEditPasswordClick = () => {
    setPasswordError("");
    setCurrentPassword("");
    setShowPasswordModal(true);
  };

  // 현재 비밀번호 확인 핸들러
  const handleCheckPassword = async (password) => {
    try {
      if (!password) {
        setPasswordError("현재 비밀번호를 입력해주세요.");
        return;
      }

      // 현재 비밀번호 확인 API 호출
      const userData = {
        email: userProfile?.email,
        password: password,
      };

      try {
        // 백엔드 개발자에게 요청: 비밀번호 확인 API를 POST 메서드로 구현해주세요.
        // 현재 API 경로: /member/verify/password
        // 요청 본문 형식: { email: "사용자이메일", password: "비밀번호" }
        console.log("비밀번호 확인 API 호출 시작");
        const response = await UserApi.verifyPassword(userData);
        console.log("비밀번호 확인 성공:", response);

        // 서버에서 boolean 값을 반환하므로 그에 맞게 처리
        if (response === true) {
          // 비밀번호가 일치하면 비밀번호 수정 모달 표시
          setShowPasswordModal(false);
          setPasswordError("");
          setShowNewPasswordModal(true);
        } else {
          setPasswordError("현재 비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("비밀번호 확인 API 오류:", error);

        // 오류 메시지 개선
        if (error.message && error.message.includes("API를 찾을 수 없습니다")) {
          setPasswordError(
            "서버 연결에 문제가 있습니다. 관리자에게 문의하세요."
          );
        } else if (error.response) {
          if (error.response.status === 401) {
            setPasswordError("현재 비밀번호가 일치하지 않습니다.");
          } else if (error.response.status === 404) {
            setPasswordError(
              "서버에서 요청한 기능을 찾을 수 없습니다. 관리자에게 문의하세요."
            );
          } else {
            setPasswordError(
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
          }
        } else {
          setPasswordError(
            "비밀번호 확인 중 오류가 발생했습니다. 다시 시도해주세요."
          );
        }
        console.error("비밀번호 확인 실패:", error);
      }
    } catch (error) {
      console.error("비밀번호 확인 처리 중 오류:", error);
      setPasswordError(
        "비밀번호 확인 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  // 비밀번호 수정 모달 닫기
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordError("");
  };

  // 새 비밀번호 모달 닫기
  const handleCloseNewPasswordModal = () => {
    setShowNewPasswordModal(false);
    setPasswordError("");
  };

  // 새 비밀번호 저장 핸들러
  const handleSaveNewPassword = async (newPassword) => {
    try {
      // 비밀번호 업데이트 요청
      const response = await UserApi.updatePassword({
        email: userProfile?.email,
        password: newPassword,
      });

      console.log("비밀번호 업데이트 성공:", response);

      // 모달 닫기 및 상태 초기화
      setShowNewPasswordModal(false);
      setCurrentPassword("");
      setPasswordError("");

      // 성공 메시지 표시
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("비밀번호 업데이트 오류:", error);
      setPasswordError(
        "비밀번호 업데이트 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
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
          <div className="name">
            {profile?.name ? (
              <div className="name">{profile.name}</div>
            ) : (
              <div className="name">{defaultProfile.name}</div>
            )}
          </div>
        </div>
      </ProfileSection>

      <div className="basic-info-title">기본 정보</div>

      <div className="email-container">
        <div className="email-title">아이디</div>
        <div className="email">
          {profile?.email ? (
            <div className="email">{profile.email}</div>
          ) : (
            <div className="email">{defaultProfile.email}</div>
          )}
        </div>
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
          onClick={handleEditPasswordClick}
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
        <div
          className="edit-content"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "6px",
            alignItems: "center",
          }}
        >
          {(() => {
            try {
              let preferencesArray = [];

              // JSON 문자열인 경우 파싱
              if (
                typeof profile.preferences === "string" &&
                profile.preferences.startsWith("[")
              ) {
                const parsedPreferences = JSON.parse(profile.preferences);
                if (Array.isArray(parsedPreferences)) {
                  preferencesArray = parsedPreferences.slice(0, 2);
                }
              }
              // 배열인 경우
              else if (Array.isArray(profile.preferences)) {
                preferencesArray = profile.preferences.slice(0, 2);
              }
              // 문자열인 경우
              else if (profile.preferences) {
                preferencesArray = [profile.preferences];
              }
              // 값이 없는 경우
              else {
                preferencesArray = [defaultProfile.preferences];
              }

              // 각 취향을 별도의 요소로 표시하고 사이에 쉼표 추가
              return preferencesArray.map((pref, index) => (
                <React.Fragment key={index}>
                  <div
                    style={{
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "14px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {pref}
                  </div>
                  {index < preferencesArray.length - 1 && (
                    <span style={{ color: "#666" }}>,</span>
                  )}
                </React.Fragment>
              ));
            } catch (error) {
              console.error("취향 데이터 파싱 오류:", error);
              return (
                <div>{profile.preferences || defaultProfile.preferences}</div>
              );
            }
          })()}
        </div>

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
          onClick={handleEditPreferenceClick}
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
        <div className="edit-content">
          {profile?.ageGroup ? (
            <div className="edit-content">{profile.ageGroup}</div>
          ) : (
            <div className="edit-content">{defaultProfile.ageGroup}</div>
          )}
        </div>
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
          onClick={handleEditAgegroupClick}
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

      {/* 취향 선택 모달 컴포넌트 사용 */}
      <PreferenceModal
        isOpen={showPreferenceModal}
        onClose={() => setShowPreferenceModal(false)}
        selectedPreferences={selectedPreferences}
        onPreferenceSelect={handlePreferenceSelect}
        onSave={handleSavePreferences}
      />

      {/* 연령대 선택 모달 컴포넌트 사용 */}
      <AgeGroupModal
        isOpen={showAgegroupModal}
        onClose={() => setShowAgegroupModal(false)}
        selectedAgegroup={selectedAgegroup}
        onSave={handleSaveAgegroup}
      />

      {/* 현재 비밀번호 확인 모달 */}
      <PasswordCheckModal
        isOpen={showPasswordModal}
        onClose={handleClosePasswordModal}
        onConfirm={handleCheckPassword}
        error={passwordError}
      />

      {/* 새 비밀번호 설정 모달 */}
      <NewPasswordModal
        isOpen={showNewPasswordModal}
        onClose={handleCloseNewPasswordModal}
        onSave={handleSaveNewPassword}
        error={passwordError}
      />
    </BasicInfoSection>
  );
};

export default UserProfile;
