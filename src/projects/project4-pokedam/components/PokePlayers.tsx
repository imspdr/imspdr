import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import PokeEditor from "./PokeEditor";
import { pokemon, pokemonSpecies } from "../store/types";
import CommonDropDown from "@src/common/CommonDropDown";
import PokeType from "./PokeType";

function PokePlayers(props: { width: number }) {
  const damStore = usePokedamStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: ${props.width}px;
        min-width: 1000px;
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
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <CommonDropDown
            width={180}
            height={30}
            nodes={damStore.pokemonList.map((poke: pokemonSpecies) => {
              return {
                label: poke.pokemonName.korean ? poke.pokemonName.korean : poke.pokemonName.english,
                value: poke.pokemonName.english,
              };
            })}
            selected={String(damStore.attacker.pokemonName.english)}
            onSelect={(v: string) => {
              const selectedPoke = damStore.pokemonList.find(
                (poke) => poke.pokemonName.english === v
              );
              if (selectedPoke) {
                damStore.attacker = {
                  ...damStore.attacker,
                  pokemonName: selectedPoke.pokemonName,
                  pokemonStat: selectedPoke.pokemonStat,
                  pokemonType: selectedPoke.pokemonType,
                };
              }
            }}
            search
          />
          <div
            css={css`
              margin-left: 30px;
              display: flex;
              flex-direction: row;
            `}
          >
            {damStore.attacker.pokemonType.map((tt) => {
              return <PokeType types={tt} />;
            })}
          </div>
        </div>
        <PokeEditor isAttacker />
      </div>
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
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <CommonDropDown
            width={180}
            nodes={damStore.pokemonList.map((poke: pokemonSpecies) => {
              return {
                label: poke.pokemonName.korean ? poke.pokemonName.korean : poke.pokemonName.english,
                value: poke.pokemonName.english,
              };
            })}
            height={30}
            selected={damStore.opponent.pokemonName.english}
            onSelect={(v: string) => {
              const selectedPoke = damStore.pokemonList.find(
                (poke) => poke.pokemonName.english === v
              );
              if (selectedPoke) {
                damStore.opponent = {
                  ...damStore.opponent,
                  pokemonName: selectedPoke.pokemonName,
                  pokemonStat: selectedPoke.pokemonStat,
                  pokemonType: selectedPoke.pokemonType,
                };
              }
            }}
            search
          />
          <div
            css={css`
              margin-left: 30px;
              display: flex;
              flex-direction: row;
            `}
          >
            {damStore.opponent.pokemonType.map((tt) => {
              return <PokeType types={tt} />;
            })}
          </div>
        </div>
        <PokeEditor isAttacker={false} />
      </div>
    </div>
  );
}

export default observer(PokePlayers);
