import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useChessStore } from "../store/ChessStoreProvider";

function ChessBlock(props: {
  color: number; // 0 for black 1 for white
  pos: { x: number; y: number };
}) {
  const chessStore = useChessStore();
  const hasQueen = () => {
    let has = false;
    chessStore.poses.forEach((pos) => {
      if (pos.x === props.pos.x) {
        if (pos.y === props.pos.y) {
          has = true;
        }
      }
    });
    return has;
  };
  return (
    <div
      css={css`
        width: ${Math.round(chessStore.boardSize / chessStore.nQueen)}px;
        height: ${Math.round(chessStore.boardSize / chessStore.nQueen)}px;
        background-color: ${props.color === 0 ? "#000000" : "#ffffff"};
      `}
      onClick={() => {
        chessStore.poses.push(props.pos);
        console.log(chessStore.poses);
      }}
    >
      {"Queen"}
    </div>
  );
}

function ChessBoard() {
  const chessStore = useChessStore();
  return (
    <div
      css={css`
        width: ${chessStore.boardSize}px;
        height: ${chessStore.boardSize}px;
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
              return <ChessBlock color={(i + j) % 2 === 0 ? 0 : 1} pos={{ x: i, y: j }} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default observer(ChessBoard);
