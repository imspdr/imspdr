import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import CommonTemplate from "@src/common/CommonTemplate";
import SortBar from "../components/SortBar";
import SortController from "../components/SortController";
import { SortStoreProvider } from "../store/SortStoreProvider";

export default function SortPage() {
  const [chessWidth, setChessWidth] = useState(window.innerWidth);
  const [chessHeight, setChessHeight] = useState(window.innerHeight);
  useEffect(() => {
    addEventListener("resize", () => {
      setChessWidth(window.innerWidth);
      setChessHeight(window.innerHeight);
    });
  }, []);
  return (
    <SortStoreProvider>
      <CommonTemplate title="정렬 시각화">
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <SortBar height={500} />
          <SortController />
        </div>
      </CommonTemplate>
    </SortStoreProvider>
  );
}
