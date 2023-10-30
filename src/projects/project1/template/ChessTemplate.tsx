import { observer } from "mobx-react";
import { css } from "@emotion/react";
import ChessBoard from "../components/ChessBoard";

function ChessPageTemplate() {
  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      <ChessBoard boardSize={500} />
    </div>
  );
}

export default observer(ChessPageTemplate);
