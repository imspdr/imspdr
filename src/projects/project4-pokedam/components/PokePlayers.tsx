import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import PokeEditor from "./PokeEditor";
import { ReactComponent as SwitchIcon } from "@src/images/switch.svg";
import { unselectable } from "@src/common/util";

function PokePlayers() {
  const damStore = usePokedamStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <PokeEditor isAttacker />
      <div
        css={css`
          padding: 5px;
          border: 1px solid;
          border-radius: 3px;
          margin: 3px;
          height: 30px;
          ${unselectable}
        `}
        onClick={() => damStore.switchPoke()}
      >
        <SwitchIcon />
      </div>
      <PokeEditor isAttacker={false} />
    </div>
  );
}

export default observer(PokePlayers);
