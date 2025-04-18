import React, { createContext, useState, useContext, useEffect } from "react";
import UserApi from "../api/UserApi";

// AuthContext 생성: 전역적으로 사용할 인증 상태 저장소
const AuthContext = createContext(null);

// AuthProvider: 애플리케이션에 인증 상태를 제공하는 컴포넌트
// 주요 기능:
// 1. 로그인 상태 관리 (isLoggedIn)
// 2. 사용자 프로필 정보 관리 (userProfile)
// 3. 페이지 새로고침시에도 로그인 상태 유지
export const AuthProvider = ({ children }) => {
  // 초기 상태를 세션 스토리지에서 가져옴
  const initializeAuthState = () => {
    try {
      const storedUserInfo = sessionStorage.getItem("userInfo");
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        return {
          isLoggedIn: true,
          userProfile: userInfo,
        };
      }
    } catch (error) {
      console.error("세션 스토리지 초기화 중 오류:", error);
    }
    return {
      isLoggedIn: false,
      userProfile: null,
    };
  };

  // 초기 상태 설정
  const initialState = initializeAuthState();
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [userProfile, setUserProfile] = useState(initialState.userProfile);

  // 상태 변경 시 세션 스토리지 동기화
  useEffect(() => {
    if (isLoggedIn && userProfile) {
      sessionStorage.setItem("userInfo", JSON.stringify(userProfile));
    } else if (!isLoggedIn) {
      sessionStorage.removeItem("userInfo");
    }
  }, [isLoggedIn, userProfile]);

  // 컴포넌트가 마운트될 때 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      console.log("AuthContext - 로그인 상태 확인 시작");

      try {
        // 먼저 세션 스토리지에서 로그인 정보 확인
        const storedUserInfo = sessionStorage.getItem("userInfo");
        console.log("세션 스토리지 저장된 정보:", storedUserInfo);

        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          console.log("파싱된 사용자 정보:", userInfo);

          if (userInfo && userInfo.id) {
            // 백엔드에 로그인 상태 확인 요청
            try {
              const res = await UserApi.checkLoginStatus();
              console.log("백엔드 로그인 체크 응답:", res.data);

              if (res.data && res.data.success) {
                setIsLoggedIn(true);
                const profileData = {
                  id: res.data.id || userInfo.id,
                  name: res.data.name || userInfo.name,
                  email: res.data.email || userInfo.email,
                  profileImage: res.data.profileImage || userInfo.profileImage,
                  ageGroup: res.data.ageGroup || userInfo.ageGroup,
                  preferences: res.data.preferences || userInfo.preferences,
                };
                setUserProfile(profileData);
                console.log("로그인 상태 설정 완료:", {
                  isLoggedIn: true,
                  profileData,
                });
              } else {
                console.log("백엔드 인증 실패 - 세션 정보 유지");
                // 백엔드 인증 실패시에도 세션 정보 유지
                setIsLoggedIn(true);
                setUserProfile(userInfo);
              }
            } catch (error) {
              console.error(
                "백엔드 연결 실패 - 세션 정보로 로그인 상태 유지:",
                error
              );
              // 백엔드 연결 실패시 세션 정보로 로그인 상태 유지
              setIsLoggedIn(true);
              setUserProfile(userInfo);
            }
          } else {
            console.log("세션에 유효한 사용자 ID 없음");
            setIsLoggedIn(false);
            setUserProfile(null);
            sessionStorage.removeItem("userInfo");
          }
        } else {
          console.log("세션에 저장된 사용자 정보 없음");
          setIsLoggedIn(false);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류:", error);
        // 에러 발생 시 세션 정보 확인
        const storedUserInfo = sessionStorage.getItem("userInfo");
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          setIsLoggedIn(true);
          setUserProfile(userInfo);
          console.log("에러 발생 - 세션 정보로 로그인 상태 복구");
        } else {
          setIsLoggedIn(false);
          setUserProfile(null);
        }
      }
    };

    checkLoginStatus();
  }, []);

  // Context Provider를 통해 자식 컴포넌트에 상태와 함수들을 전달
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth: 다른 컴포넌트에서 인증 상태를 쉽게 사용할 수 있게 해주는 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Provider 없이 useAuth를 사용하려고 할 때 에러 발생
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
