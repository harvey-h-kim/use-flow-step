import { useNavigate } from "react-router-dom";
import { useFeatureAStore } from "../../store/feature-a-store";
import { useState } from "react";

export default function ResultPage() {
  const navigate = useNavigate();
  const { getAllData, reset, updateStepData, prevStep } = useFeatureAStore();

  const allData = getAllData();
  console.log("step-result data", allData);

  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    updateStepData("a-result", { confirmed: true });

    // 여기서 실제로는 서버에 데이터를 제출하는 로직이 들어갈 수 있습니다
    console.log("제출된 데이터:", allData);
  };

  const handleReset = () => {
    reset();
    navigate("/feature-a/a-1");
  };

  const handleBack = () => {
    const prev = prevStep();
    navigate(`/feature-a/${prev}`);
  };

  return (
    <div className="step-form">
      <h2>결과 확인</h2>

      <div className="result-summary">
        <h3>입력 정보 요약</h3>

        <div className="result-section">
          <h4>개인 정보</h4>
          <p>이름: {allData["a-1"]?.name}</p>
          <p>이메일: {allData["a-1"]?.email}</p>
        </div>

        <div className="result-section">
          <h4>주소 정보</h4>
          <p>주소: {allData["a-2"]?.address}</p>
          <p>도시: {allData["a-2"]?.city}</p>
        </div>

        <div className="result-section">
          <h4>선호도</h4>
          <ul>
            {allData["a-3"]?.preferences.map((pref: string) => (
              <li key={pref}>{pref}</li>
            ))}
          </ul>
        </div>
      </div>

      {!confirmed ? (
        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>
            이전
          </button>
          <button
            type="button"
            className="confirm-button"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      ) : (
        <div className="completion-message">
          <p>👍 성공적으로 제출되었습니다!</p>
          <button type="button" className="reset-button" onClick={handleReset}>
            처음부터 다시
          </button>
        </div>
      )}
    </div>
  );
}
