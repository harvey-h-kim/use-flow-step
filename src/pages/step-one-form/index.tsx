import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeatureAStore } from "../../store/feature-a-store";
import { useMutation } from "@tanstack/react-query";
import { apiNewPost } from "../../apis";
import { withLoading, WithLoadingProps } from "../../components/with-loading";

function Step1Form({ setLoading }: WithLoadingProps) {
  const navigate = useNavigate();
  const { getStepData, updateStepData, nextStep, setApiResponse } =
    useFeatureAStore();
  const stepData = getStepData("a-1");

  // cache key만 설정하면 된다.
  const { mutate } = useMutation({
    mutationKey: ["newPost"],
    mutationFn: apiNewPost,
    onMutate: () => {
      console.log("onMutate!");
      setLoading(true);
    },
    onSuccess: (data) => {
      console.log("onSuccess!");
      console.log("data", data);
      setApiResponse("step1Response", data);
      updateStepData("a-1", formData);
      const next = nextStep();
      navigate(`/feature-a/${next}`);
      setLoading(false);
    },
  });

  console.log("step-1 data", stepData);

  const [formData, setFormData] = useState({
    name: stepData?.data.name || "",
    email: stepData?.data.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ body: "body", title: "title", userId: 1 });
  };

  return (
    <div className="step-form">
      <h2>Step 1: 개인 정보</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="next-button">
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default withLoading(Step1Form);
