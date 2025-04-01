import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import FeatureALayout from "../components/feature-a-layout";
import Step1Form from "../pages/step-one-form";
import Step2Form from "../pages/step-two-form";
import Step3Form from "../pages/step-three-form";
import ResultPage from "../pages/step-result";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "feature-a",
        element: <FeatureALayout />,
        children: [
          {
            path: "a-1",
            element: <Step1Form />,
          },
          {
            path: "a-2",
            element: <Step2Form />,
          },
          {
            path: "a-3",
            element: <Step3Form />,
          },
          { path: "a-result", element: <ResultPage /> },
        ],
      },
    ],
  },
]);
