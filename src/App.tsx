import { Route, Routes, useNavigate } from "react-router-dom";
import ThemeToggle from "./common/ThemeToggle";
import { css } from "@emotion/react";
import MainPage from "./projects/project0/page/MainPage";
import ChessPage from "./projects/project1-nqueen/page/ChessPage";
import SortPage from "./projects/project2-sort/page/SortPage";
import { unselectable } from "./common/util";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        css={css`
          position: absolute;
          top: 0px;
          width: calc(99vw);
          height: 64px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
          css={css`
            ${unselectable}
          `}
        >
          IMSPDR
        </div>
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
          <Route path="/chess" element={<ChessPage />} />
          <Route path="/sort" element={<SortPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
