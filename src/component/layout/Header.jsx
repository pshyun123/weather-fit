import React, { useState, useEffect } from "react";
import userIcon from "../../images/header_person.png";
import HeaderContainer from "./HeaderStyle";
import { useNavigate } from "react-router-dom";
import UserApi from "../../api/UserApi";
import Common from "../../utils/Common";
import { useAuth } from "../../context/AuthContext";
import logoColor from "../../images/logo_color.png";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userProfile, setIsLoggedIn, setUserProfile } = useAuth();
  const [showUserOptions, setShowUserOptions] = useState(false);

  // 외부 클릭 시 옵션 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-icon")) {
        setShowUserOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    console.log("로고 클릭, 메인페이지 이동");
    navigate("/");
  };

  const handleUserIconClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setShowUserOptions(!showUserOptions);
  };

  const handleLogout = async () => {
    try {
      await UserApi.logout();
      setIsLoggedIn(false);
      setUserProfile(null);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // 프로필 이미지 URL 확인 및 처리
  const getProfileImageSrc = () => {
    if (!userProfile || !userProfile.profileImage) {
      return userIcon;
    }

    // Base64 이미지인 경우 그대로 사용
    if (userProfile.profileImage.startsWith("data:image")) {
      return userProfile.profileImage;
    }

    // 상대 경로인 경우 서버 URL과 결합
    if (userProfile.profileImage.startsWith("/")) {
      return `${Common.WWEATHERFIT}${userProfile.profileImage}`;
    }

    // 그 외의 경우 (파일명만 있는 경우 등) 서버 업로드 경로와 결합
    return `${Common.WWEATHERFIT}/uploads/${userProfile.profileImage}`;
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        color: "#fff",
        height: "60px",
        width: "100%",
      }}
    >
      <HeaderContainer>
        <div
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logoColor}
            alt="logoColor"
            style={{ width: "100px", height: "auto" }}
          />
        </div>

        <div
          className="user-icon"
          onClick={handleUserIconClick}
          style={{ cursor: "pointer" }}
        >
          <span>
            {isLoggedIn ? (
              <img
                src={getProfileImageSrc()}
                alt="프로필"
                className="profile-image"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  console.error("이미지 로드 실패:", userProfile?.profileImage);
                  e.target.src = userIcon;
                }}
              />
            ) : (
              <img
                src={userIcon}
                alt="userstate"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
          </span>
          {showUserOptions && (
            <div className={`options ${showUserOptions ? "show" : ""}`}>
              {isLoggedIn ? (
                <>
                  <div onClick={() => navigate("/mypage")}>마이페이지</div>
                  <div onClick={handleLogout}>로그아웃</div>
                </>
              ) : (
                <>
                  <div onClick={() => navigate("/login")}>로그인</div>
                  <div onClick={() => navigate("/join")}>회원가입</div>
                </>
              )}
            </div>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
