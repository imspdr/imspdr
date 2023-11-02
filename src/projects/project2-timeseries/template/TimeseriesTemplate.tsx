import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import CommonTemplate from "@src/common/CommonTemplate";

function TimeseriesTemplate() {
  const [chessWidth, setChessWidth] = useState(window.innerWidth);
  const [chessHeight, setChessHeight] = useState(window.innerHeight);
  useEffect(() => {
    addEventListener("resize", () => {
      setChessWidth(window.innerWidth);
      setChessHeight(window.innerHeight);
    });
  }, []);
  return (
    <CommonTemplate title="시계열 분석">
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        내용
      </div>
    </CommonTemplate>
  );
}

export default observer(TimeseriesTemplate);
