import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";

function PokeHistory() {
  return (
    <div
      css={css`
        margin-left: 20px;
        padding: 20px;
        border: 2px solid;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `}
    ></div>
  );
}

export default observer(PokeHistory);
