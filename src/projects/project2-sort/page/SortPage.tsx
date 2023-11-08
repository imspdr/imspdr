import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import CommonTemplate from "@src/common/CommonTemplate";
import { SortStoreProvider } from "../store/SortStoreProvider";
import SortBar from "../components/SortBar";
import SortController from "../components/SortController";
import SortScore from "../components/SortScore";

export default function SortPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
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
          <SortController width={1200} />
          <SortScore width={1200} />
          <SortBar width={1200} height={500} />
        </div>
      </CommonTemplate>
    </SortStoreProvider>
  );
}
