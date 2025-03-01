import React from "react";

const PreferenceModal = ({
  isOpen,
  onClose,
  selectedPreferences,
  onPreferenceSelect,
  onSave,
}) => {
  if (!isOpen) return null;

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
          maxWidth: "500px",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>취향</h2>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "20px",
          }}
        >
          최대 2개의 스타일을 고를 수 있어요
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {["미니멀", "모던", "캐주얼", "스트릿", "러블리", "럭셔리"].map(
            (style) => (
              <button
                key={style}
                style={{
                  padding: "10px 20px",
                  borderRadius: "50px",
                  border: "1px solid #ddd",
                  backgroundColor: selectedPreferences.includes(style)
                    ? "#f0f0f0"
                    : "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: selectedPreferences.includes(style)
                    ? "bold"
                    : "normal",
                  minWidth: "100px",
                }}
                onClick={() => onPreferenceSelect(style)}
              >
                {style}
              </button>
            )
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#262626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={onSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferenceModal;
