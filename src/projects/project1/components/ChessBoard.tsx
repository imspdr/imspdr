import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useChessStore } from "../store/ChessStoreProvider";
import { unselectable } from "@src/common/Util";

function ChessBlock(props: {
  color: number; // 0 for black 1 for white
  size: number;
  hasQueen: boolean;
  isCovered: boolean;
  onClick: () => void;
}) {
  return (
    <div
      css={css`
        width: ${props.size}px;
        height: ${props.size}px;
        background-color: ${props.color === 0
          ? props.isCovered
            ? "#00dddd"
            : "#000000"
          : props.isCovered
          ? "#55ffff"
          : "#ffffff"};
        color: #000000;
        transition: 0s;
        display: flex;
        align-items: center;
        justify-content: center;
        ${unselectable}
      `}
      onClick={props.onClick}
    >
      {props.hasQueen ? "Q" : ""}
    </div>
  );
}

function ChessBoard(props: { boardSize: number }) {
  const chessStore = useChessStore();
  const boardSize = Math.round(props.boardSize / chessStore.nQueen) * chessStore.nQueen;
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direcion: row;
          justify-content: space-between;
          width: ${props.boardSize}px;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            width: ${Math.round(props.boardSize / 3)}px;
          `}
        >
          {`N-퀸 : `}
          <div
            onClick={() => {
              if (chessStore.nQueen > 4) {
                chessStore.nQueen = chessStore.nQueen - 1;
              }
            }}
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              ${unselectable}
            `}
          >
            {"-"}
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
            `}
          >
            {`${chessStore.nQueen}`}
          </div>
          <div
            onClick={() => {
              if (chessStore.nQueen < 20) {
                chessStore.nQueen = chessStore.nQueen + 1;
              }
            }}
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              ${unselectable}
            `}
          >
            {"+"}
          </div>
        </div>
        <div
          onClick={() => chessStore.clear()}
          css={css`
            ${chessStore.solving ? "color : #AAAAAA;" : ""}
            ${unselectable}
          `}
        >
          {chessStore.poses.split(",").length - 1 === chessStore.nQueen ? "CLEAR !!" : "새로고침"}
        </div>
        <div
          onClick={() => {
            if (chessStore.solving) {
              chessStore.onClickStop();
            } else {
              chessStore.onClickSolver();
            }
          }}
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            ${unselectable}
          `}
        >
          {chessStore.solving ? "그만해!" : "풀어줘!"}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            width: ${Math.round(props.boardSize / 4)}px;
          `}
        >
          <div>{`배치한 퀸 : `}</div>
          <div
            css={css`
              width: 20px;
              margin-left: 10px;
            `}
          >
            {`${chessStore.poses.split(",").length - 1}`}
          </div>
        </div>
      </div>
      <div
        css={css`
          width: ${boardSize}px;
          height: ${boardSize}px;
          border: 5px solid;
          margin-top: 10px;
        `}
      >
        {[...new Array(chessStore.nQueen)].map((_, i) => {
          return (
            <div
              css={css`
                display: flex;
                flex-direcion: row;
              `}
            >
              {[...new Array(chessStore.nQueen)].map((_, j) => {
                return (
                  <ChessBlock
                    color={(i + j) % 2 === 0 ? 0 : 1}
                    size={Math.round(props.boardSize / chessStore.nQueen)}
                    hasQueen={chessStore.included(i, j)}
                    isCovered={chessStore.isCovered(i, j)}
                    onClick={() => {
                      chessStore.addQueenOnPos(i, j);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default observer(ChessBoard);
