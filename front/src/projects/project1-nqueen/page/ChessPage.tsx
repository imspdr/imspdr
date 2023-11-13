import { css } from "@emotion/react";
import ChessBoard from "../components/ChessBoard";
import ExplainBlog from "../components/explainBlog/ExplainBlog";
import { useState, useEffect } from "react";
import CommonTemplate from "@src/common/CommonTemplate";
import { ChessStoreProvider } from "../store/ChessStoreProvider";

function ChessPage() {
  const [chessWidth, setChessWidth] = useState(window.innerWidth);
  const [chessHeight, setChessHeight] = useState(window.innerHeight);
  useEffect(() => {
    addEventListener("resize", () => {
      setChessWidth(window.innerWidth);
      setChessHeight(window.innerHeight);
    });
  }, []);
  return (
    <ChessStoreProvider>
      <CommonTemplate title="P=NP와 n-퀸 문제">
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              margin-right: 20px;
            `}
          >
            <ExplainBlog width={chessWidth / 2} height={chessHeight - 200} />
          </div>
          <ChessBoard boardSize={chessWidth / 3} />
        </div>
      </CommonTemplate>
    </ChessStoreProvider>
  );
}

export default ChessPage;
