import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          marginTop: "68px",
          marginLeft: "64px",
          backgroundColor: "var(--background)",
        }}
      >
        <Routes>
          <Route path="/automlHome" element={<AutomlHomePage />} />
          <Route path="/automlCreateExp/:solutionType/:expName" element={<AutomlCreatePage />} />
          <Route path="/automlExpMenu/:solutionType/:expId" element={<AutomlExpMenuPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
