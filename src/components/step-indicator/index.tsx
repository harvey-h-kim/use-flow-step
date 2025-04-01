import React from "react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: string | null;
}

/**
 * 간단한 스텝 인디케이터 컴포넌트
 */
const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  const currentIndex = currentStep ? steps.indexOf(currentStep) : -1;

  return (
    <div className="step-indicator">
      <div className="steps-container">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={step}
              className={`step ${isActive ? "active" : ""} ${
                isCompleted ? "completed" : ""
              }`}
            >
              <div className="step-circle">{isCompleted ? "✓" : index + 1}</div>
              <div className="step-label">{step}</div>

              {index < steps.length - 1 && (
                <div
                  className={`step-line ${isCompleted ? "completed" : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
