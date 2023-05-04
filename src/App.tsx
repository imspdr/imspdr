import { Route, Routes } from "react-router-dom";
import TestPage from "./page/TestPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
    </Routes>
  );
}

export default App;
