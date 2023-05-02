import { Route, Routes } from "react-router-dom";
import TestPage from "./page/TestPage";

function App() {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--background)",
      }}
    >
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
