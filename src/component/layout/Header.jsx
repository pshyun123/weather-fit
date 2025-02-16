import React, { useState, useEffect } from "react";
import userIcon from "../../assets/header_person.png";
import HeaderContainer from "./HeaderStyle";
import { useNavigate } from "react-router-dom";
import UserApi from "../../api/UserApi";
import Common from "../../utils/Common";

const Header = () => {
  const navigate = useNavigate();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // 로그인 상태 및 사용자 정보 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await UserApi.checkLoginStatus();
        console.log("로그인 상태 확인 응답:", res.data);

        if (res.data && res.data.success) {
          setIsLoggedIn(true);
          // URL에서 앞의 슬래시 제거
          const profileUrl = res.data.profileImage.startsWith("/")
            ? res.data.profileImage.substring(1)
            : res.data.profileImage;
          setUserProfile(profileUrl);
          console.log("로그인 상태 확인 성공:", {
            isLoggedIn: true,
            profileImage: profileUrl,
            name: res.data.name,
          });
        } else {
          setIsLoggedIn(false);
          setUserProfile(null);
          console.log("로그인 되지 않은 상태");
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };

    checkLoginStatus();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const handleLogoClick = () => {
    console.log("로고 클릭, 메인페이지 이동");
    navigate("/");
  };

  const handleUserIconClick = () => {
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

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        color: "#fff",
        height: "80px",
        width: "100%",
      }}
    >
      <HeaderContainer>
        <div
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          WEATHER FIT
        </div>

        <div
          className="user-icon"
          onClick={handleUserIconClick}
          style={{ cursor: "pointer" }}
        >
          <span>
            {isLoggedIn && userProfile ? (
              <img
                src={userProfile}
                alt="프로필"
                className="profile-image"
                onError={(e) => {
                  console.error("이미지 로드 실패:", userProfile);
                  e.target.src = userIcon;
                }}
              />
            ) : (
              <img src={userIcon} alt="userstate" />
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
