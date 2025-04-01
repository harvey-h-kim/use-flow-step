import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeatureAStore } from "../../store/feature-a-store";
import { useQueryClient } from "@tanstack/react-query";

export default function Step2Form() {
  const navigate = useNavigate();
  const { getStepData, updateStepData, nextStep, prevStep } =
    useFeatureAStore();
  const queryClient = useQueryClient();

  const cachedData = queryClient.getMutationCache().getAll();

  const stepData = getStepData("a-2");

  console.log("step-2 data", stepData);
  console.log("cachedData", cachedData);

  const [formData, setFormData] = useState({
    address: stepData?.data.address || "",
    city: stepData?.data.city || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStepData("a-2", formData);
    const next = nextStep();
    navigate(`/feature-a/${next}`);
  };

  const handleBack = () => {
    const prev = prevStep();
    navigate(`/feature-a/${prev}`);
  };

  return (
    <div className="step-form">
      <h2>Step 2: 주소 정보</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">주소:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="주소를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">도시:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="도시를 입력하세요"
          />
        </div>

        <div className="button-group">
          <button onClick={() => navigate("/")}>처음으로 돌아가기</button>
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
