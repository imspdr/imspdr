import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ThemeToggle from "./common/ThemeToggle";
import { css } from "@emotion/react";
import MainPage from "./projects/project0/MainPage";
import { unselectable } from "./common/util";

const urlMap = [
  {
    url: "chess",
    label: "N-queen 문제",
  },
  {
    url: "sort",
    label: "정렬 시각화",
  },
  {
    url: "suika",
    label: "수박 게임",
  },
  {
    url: "pokedam",
    label: "포켓몬 데미지 계산기",
  },
  {
    url: "cell",
    label: "정형데이터 시각화",
  },
];

function App() {
  const navigate = useNavigate();
  const ChessPage = lazy(() => import("./projects/project1-nqueen/ChessPage"));
  const SortPage = lazy(() => import("./projects/project2-sort/SortPage"));
  const SuikaPage = lazy(() => import("./projects/project3-suika/SuikaPage"));
  const PokedamPage = lazy(() => import("./projects/project4-pokedam/PokedamPage"));
  const CellPage = lazy(() => import("./projects/project5-datacell/CellPage"));
  const url = window.location.href.split("/");
  const label = urlMap.find((val) => val.url === url[url.length - 1]);
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
            display: flex;
            flex-direction: row;
            ${unselectable}
          `}
        >
          {`IMSPDR - ${label ? label.label : "연습장"}`}
        </div>
        <ThemeToggle />
      </div>
      <div
        css={css`
          margin-top: 64px;
          height: calc(99vh - 64px);
        `}
      >
        <Suspense fallback={<div>{"loading"}</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/chess" element={<ChessPage />} />
            <Route path="/sort" element={<SortPage />} />
            <Route path="/suika" element={<SuikaPage />} />
            <Route path="/pokedam" element={<PokedamPage />} />
            <Route path="/cell" element={<CellPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
