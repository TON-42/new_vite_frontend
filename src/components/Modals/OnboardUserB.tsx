// src/components/Modals/OnboardUserB.jsx
import React from "react";

const OnboardUserB = ({onClose}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          width: "80%",
          maxWidth: "500px",
        }}
      >
        <h2>Welcome to ChatPay!</h2>
        <p>
          You got invited to sell your chats, checkout who invited you and how
          much you can earn
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Chats
        </button>
      </div>
    </div>
  );
};

export default OnboardUserB;
