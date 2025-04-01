import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import StepIndicator from "../step-indicator";
import { FeatureAData, useFeatureAStore } from "../../store/feature-a-store";

function FeatureALayout() {
  const { step } = useParams();
  const navigate = useNavigate();
  const { currentStep, updateCurrentStepFromPath } = useFeatureAStore();

  console.log("step", step);

  useEffect(() => {
    if (step && step !== currentStep) {
      updateCurrentStepFromPath(step as keyof FeatureAData);
    } else if (!step && currentStep) {
      // 스텝이 URL에 없으면 현재 스텝으로 리디렉션
      navigate(`/feature-a/${currentStep}`);
    }
  }, [step, currentStep, navigate, updateCurrentStepFromPath]);

  return (
    <div className="feature-a-container">
      <h1>기능 A</h1>
      <StepIndicator
        steps={["a-1", "a-2", "a-3", "a-result"]}
        currentStep={currentStep}
      />
      <Outlet />
    </div>
  );
}

export default FeatureALayout;
