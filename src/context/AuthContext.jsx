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
  // 로그인 상태를 저장하는 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 사용자 프로필 정보를 저장하는 state
  const [userProfile, setUserProfile] = useState(null);

  // 컴포넌트가 마운트될 때 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 백엔드에 로그인 상태 확인 요청
        const res = await UserApi.checkLoginStatus();
        console.log("AuthContext 로그인 체크 응답:", res.data);

        // 로그인이 유효한 경우
        if (res.data && res.data.success) {
          // 로그인 상태를 true로 설정
          setIsLoggedIn(true);
          // 사용자 프로필 정보 설정
          const profileData = {
            name: res.data.name,
            email: res.data.email,
            profileImage: res.data.profileImage,
            ageGroup: res.data.ageGroup,
            id: res.data.id, // ID 정보도 저장
          };
          setUserProfile(profileData);
          console.log("프로필 데이터 설정:", {
            ...profileData,
            profileImage: profileData.profileImage ? "(이미지 데이터)" : null,
          });
        }
      } catch (error) {
        // 에러 발생 시 로그인 상태 초기화
        console.error("AuthContext 로그인 체크 실패:", error);
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };

    // 컴포넌트 마운트 시 로그인 상태 확인 실행
    checkLoginStatus();
  }, []);

  // Context Provider를 통해 자식 컴포넌트에 상태와 함수들을 전달
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, // 현재 로그인 상태
        setIsLoggedIn, // 로그인 상태 변경 함수
        userProfile, // 사용자 프로필 정보
        setUserProfile, // 프로필 정보 변경 함수
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
