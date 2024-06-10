import React, { useState } from "react";
import { Steps, Button } from "@telegram-apps/telegram-ui"; // Ensure these components are imported correctly

const SaleInfo: React.FC = () => {
  const stepsData = [
    "We do not collect your data (check)",
    "Your data will be sold only for AI training purposes",
    "We do tech for good",
    "We want to change what data means",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, stepsData.length - 1));
  };

  return (
    <div
      style={{
        alignItems: "center",
        background: "var(--tgui--secondary_bg_color)",
        display: "inline-flex",
        flexDirection: "column",
        padding: 20,
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        borderRadius: "10px",
      }}
    >
      {stepsData.slice(0, currentStep + 1).map((step, index) => (
        <div key={index} style={{ margin: "10px 0", width: "100%" }}>
          <Steps count={stepsData.length} progress={index + 1} />
          <p>{step}</p>
        </div>
      ))}
      {currentStep < stepsData.length - 1 && (
        <Button onClick={handleNext} style={{ marginTop: "20px" }}>
          Next
        </Button>
      )}
    </div>
  );
};

export default SaleInfo;
