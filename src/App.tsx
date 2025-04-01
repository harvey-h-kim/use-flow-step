import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const moveToFeatureA = () => {
    navigate("/feature-a");
  };

  return (
    <>
      <button onClick={moveToFeatureA}>A 기능으로 이동하자!</button>
      <Outlet />
    </>
  );
}

export default App;
