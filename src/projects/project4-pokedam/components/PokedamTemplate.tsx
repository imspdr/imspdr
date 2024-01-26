import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import { useEffect, useState } from "react";
import PokeHistory from "./PokeHistory";
import PokePlayers from "./PokePlayers";
import PokeResult from "./PokeResult";

function PokedamTemplate(props: { width: number }) {
  const pokedamStore = usePokedamStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        padding: 50px;
      `}
    >
      <div>
        <PokePlayers width={1000} />
        <PokeResult />
      </div>
      <PokeHistory />
    </div>
  );
}

export default observer(PokedamTemplate);
