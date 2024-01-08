import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";

function PokePlayers(props: { width: number }) {
  const damStore = usePokedamStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: ${props.width}px;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          border: 2px solid;
          width: 200px;
          border-radius: 5px;
        `}
      ></div>
      <div
        css={css`
          border: 2px solid;
          width: 200px;
        `}
      >
        수비자
      </div>
    </div>
  );
}

export default observer(PokePlayers);
