import React, { useState } from "react";

const AgeGroupModal = ({ isOpen, onClose, selectedAgegroup, onSave }) => {
  const [localSelectedAgegroup, setLocalSelectedAgegroup] = useState(
    selectedAgegroup || ""
  );

  if (!isOpen) return null;

  const handleAgegroupSelect = (agegroup) => {
    setLocalSelectedAgegroup(agegroup);
  };

  const handleSave = () => {
    onSave(localSelectedAgegroup);
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
          maxWidth: "500px",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>연령대</h2>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "20px",
          }}
        >
          연령대에 맞는 스타일을 추천드려요 :)
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {[
            "~20대초반",
            "20대중반",
            "20대후반",
            "30대초반",
            "30대중반",
            "30대후반~",
          ].map((agegroup) => (
            <button
              key={agegroup}
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                border: "1px solid #ddd",
                backgroundColor:
                  localSelectedAgegroup === agegroup ? "#f0f0f0" : "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight:
                  localSelectedAgegroup === agegroup ? "bold" : "normal",
                minWidth: "100px",
              }}
              onClick={() => handleAgegroupSelect(agegroup)}
            >
              {agegroup}
            </button>
          ))}
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
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeGroupModal;
