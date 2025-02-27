import React, { useState } from "react";

const NewPasswordModal = ({ isOpen, onClose, onSave, error }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    // 비밀번호 유효성 검사
    if (!newPassword) {
      setLocalError("새 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword.length < 8) {
      setLocalError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 유효성 검사 통과 시 저장
    setLocalError("");
    onSave(newPassword);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          새 비밀번호 설정
        </h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
          새로운 비밀번호를 입력해주세요. (8자 이상)
        </p>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호 확인"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {(localError || error) && (
          <p
            style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {localError || error}
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 20px",
              backgroundColor: "#262626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordModal;
