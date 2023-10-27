import { observer } from "mobx-react";
import { css } from "@emotion/react";
import ChessBoard from "../components/ChessBoard";

function ChessPageTemplate() {
  return <ChessBoard />;
}

export default observer(ChessPageTemplate);
