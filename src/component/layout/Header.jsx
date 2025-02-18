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
          // success 값만으로 로그인 상태 판단
          setIsLoggedIn(true);
          // profileImage가 있는 경우에만 설정
          if (res.data.profileImage) {
            const profileUrl = res.data.profileImage.startsWith("/")
              ? res.data.profileImage.substring(1)
              : res.data.profileImage;
            setUserProfile(profileUrl);
          } else {
            setUserProfile(null); // 프로필 이미지가 없으면 null로 설정
          }
        } else {
          setIsLoggedIn(false);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };

    checkLoginStatus();
  }, []);

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
            {isLoggedIn ? (
              <img
                src={userProfile || userIcon}
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
