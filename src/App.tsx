import { Route, Routes } from "react-router-dom";
import ThemeToggle from "./common/ThemeToggle";
import { css } from "@emotion/react";
import MainPage from "./projects/project0/page/MainPage";

function App() {
  return (
    <div>
      <div
        css={css`
          position: absolute;
          top: 0px;
          width: calc(99vw);
          min-width: 320px;
          height: 64px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}
      >
        IMSPDR
        <ThemeToggle />
      </div>
      <div
        css={css`
          margin-top: 64px;
          width: calc(99vw);
          height: calc(99vh - 64px);
        `}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
