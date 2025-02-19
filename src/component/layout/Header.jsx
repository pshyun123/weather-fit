import React, { useState, useEffect } from "react";
import userIcon from "../../assets/header_person.png";
import HeaderContainer from "./HeaderStyle";
import { useNavigate } from "react-router-dom";
import UserApi from "../../api/UserApi";
import Common from "../../utils/Common";
import { useAuth } from "../../context/AuthContext";

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
                src={userProfile?.profileImage || userIcon}
                alt="프로필"
                className="profile-image"
                onError={(e) => {
                  console.error("이미지 로드 실패:", userProfile?.profileImage);
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
