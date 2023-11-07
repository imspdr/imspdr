import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import CommonTemplate from "@src/common/CommonTemplate";
import { SortStoreProvider } from "../store/SortStoreProvider";
import SortBar from "../components/SortBar";
import SortController from "../components/SortController";
import SortScore from "../components/SortScore";

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
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <div>
            <SortController />
            <SortScore />
            <SortBar width={1000} height={500} />
          </div>
        </div>
      </CommonTemplate>
    </SortStoreProvider>
  );
}
