import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import PokeEditor from "./PokeEditor";
import { pokemon, pokemonSpecies } from "../store/types";
import CommonDropDown from "@src/common/CommonDropDown";

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
          width: 450px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          padding: 5px;
        `}
      >
        <CommonDropDown
          width={200}
          nodes={damStore.pokemonList.map((poke: pokemonSpecies, index: number) => {
            return {
              label: poke.pokemonName.korean ? poke.pokemonName.korean : poke.pokemonName.english,
              value: String(index),
            };
          })}
          selected={String(damStore.attacker.index)}
          onSelect={(v: string) => {
            const index = Number(v);
            const selectedPoke = damStore.pokemonList[index];
            if (index && selectedPoke) {
              damStore.attacker = {
                ...damStore.attacker,
                index: index,
                pokemonName: selectedPoke.pokemonName,
                pokemonStat: selectedPoke.pokemonStat,
                pokemonType: selectedPoke.pokemonType,
              };
            }
          }}
        />
        <PokeEditor isAttacker />
      </div>
    </div>
  );
}

export default observer(PokePlayers);
