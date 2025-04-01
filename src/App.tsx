import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const moveToFeatureA = () => {
    navigate("/feature-a");
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <button onClick={moveToFeatureA}>A 기능으로 이동하자!</button>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
