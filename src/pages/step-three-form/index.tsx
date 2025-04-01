import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeatureAStore } from "../../store/feature-a-store";

export default function Step3Form() {
  const navigate = useNavigate();
  const { getStepData, updateStepData, nextStep, prevStep } =
    useFeatureAStore();
  const stepData = getStepData("a-3");

  console.log("step-3 data", stepData);

  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    stepData?.data.preferences || []
  );

  const preferences = ["옵션1", "옵션2", "옵션3", "옵션4"];

  const togglePreference = (pref: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStepData("a-3", { preferences: selectedPreferences });

    const next = nextStep();
    navigate(`/feature-a/${next}`);
  };

  const handleBack = () => {
    const prev = prevStep();
    navigate(`/feature-a/${prev}`);
  };

  return (
    <div className="step-form">
      <h2>Step 3: 선호도 선택</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <p>선호하는 옵션을 선택하세요 (하나 이상):</p>

          <div className="checkbox-group">
            {preferences.map((pref) => (
              <label key={pref} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedPreferences.includes(pref)}
                  onChange={() => togglePreference(pref)}
                />
                {pref}
              </label>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>
            이전
          </button>
          <button type="submit" className="next-button">
            다음
          </button>
        </div>
      </form>
    </div>
  );
}
