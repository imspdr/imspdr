import { css } from "@emotion/react";
import { useCallback } from "react";
import { pokemon, habcds } from "../store/types";
import { observer } from "mobx-react";
import CommonNumberField from "@src/common/CommonNumberField";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import { unselectable } from "@src/common/util";
import { pokemonSpecies } from "../store/types";
import CommonDropDown from "@src/common/CommonDropDown";
import PokeType from "./PokeType";
import JapSearch from "./JapSearch";

function PokeEditor(props: { isAttacker: boolean }) {
  const damStore = usePokedamStore();
  const poke = props.isAttacker ? damStore.attacker : damStore.opponent;
  const habcdsList = ["h", "a", "b", "c", "d", "s"];
  const dataList: {
    title: string;
    label: "effort" | "individual" | "pokemonStat" | "rank";
    max: number;
    min?: number;
  }[] = [
    { title: "노력치", label: "effort", max: 252 },
    { title: "개체값", label: "individual", max: 31 },
    { title: "종족값", label: "pokemonStat", max: 300 },
    { title: "랭크업", label: "rank", max: 6, min: -6 },
  ];

  const RenderValues = useCallback(() => {
    return (
      <>
        {dataList.map((dt) => {
          return (
            <div
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
              `}
              key={dt.label}
            >
              <div
                css={css`
                  width: 70px;
                `}
              >
                {dt.title}
              </div>
              {habcdsList.map((key: string) => {
                const keyreal = key as keyof habcds;
                return (
                  <CommonNumberField
                    key={`${keyreal}-${dt.label}`}
                    value={poke[dt.label][keyreal]}
                    onChange={(v: number) => {
                      damStore.setOption(props.isAttacker, dt.label, keyreal, v);
                    }}
                    min={dt.min ? dt.min : 0}
                    max={dt.max}
                  ></CommonNumberField>
                );
              })}
            </div>
          );
        })}
        <div
          css={css`
            border: 1px solid;
            height: 0px;
          `}
        ></div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 5px;
          `}
        >
          <div
            css={css`
              width: 70px;
            `}
          >
            {"실능(Lv50)"}
          </div>
          {habcdsList.map((key: string) => {
            const keyreal = key as keyof habcds;
            return (
              <div
                key={key}
                css={css`
                  margin-left: 10px;
                  width: 50px;
                `}
              >
                {poke.real[keyreal]}
              </div>
            );
          })}
        </div>
      </>
    );
  }, [poke]);

  return (
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
          justify-content: space-between;
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
            width={120}
            height={30}
            customCss={"margin-right: 5px;"}
            nodes={damStore.pokemonList.map((poke: pokemonSpecies) => {
              return {
                label: poke.pokemonName.korean ? poke.pokemonName.korean : poke.pokemonName.english,
                value: poke.pokemonName.english,
              };
            })}
            selected={String(poke.pokemonName.english)}
            onSelect={(v: string) => {
              const selectedPoke = damStore.pokemonList.find(
                (poke) => poke.pokemonName.english === v
              );
              if (selectedPoke) {
                if (props.isAttacker) {
                  damStore.attacker = {
                    ...damStore.attacker,
                    pokemonName: selectedPoke.pokemonName,
                    pokemonStat: selectedPoke.pokemonStat,
                    pokemonType: selectedPoke.pokemonType,
                  };
                } else {
                  damStore.opponent = {
                    ...damStore.opponent,
                    pokemonName: selectedPoke.pokemonName,
                    pokemonStat: selectedPoke.pokemonStat,
                    pokemonType: selectedPoke.pokemonType,
                  };
                }
              }
            }}
            search
          />
          <JapSearch
            nodes={damStore.pokemonList}
            selected={String(poke.pokemonName.english)}
            onSelect={(v: string) => {
              const selectedPoke = damStore.pokemonList.find(
                (poke) => poke.pokemonName.english === v
              );
              if (selectedPoke) {
                if (props.isAttacker) {
                  damStore.attacker = {
                    ...damStore.attacker,
                    pokemonName: selectedPoke.pokemonName,
                    pokemonStat: selectedPoke.pokemonStat,
                    pokemonType: selectedPoke.pokemonType,
                  };
                } else {
                  damStore.opponent = {
                    ...damStore.opponent,
                    pokemonName: selectedPoke.pokemonName,
                    pokemonStat: selectedPoke.pokemonStat,
                    pokemonType: selectedPoke.pokemonType,
                  };
                }
              }
            }}
          />
          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            {poke.pokemonType.map((tt) => {
              return <PokeType types={tt} />;
            })}
          </div>
        </div>

        <div
          css={css`
            padding: 5px;
            border: 1px solid;
            border-radius: 3px;
            margin: 3px;
            ${unselectable}
          `}
          onClick={() => damStore.savePoke(props.isAttacker)}
        >
          저장
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          border: 1px solid;
          border-radius: 5px;
          padding: 10px;
          margin-top: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <div
            css={css`
              width: 70px;
            `}
          >
            성격
          </div>
          {habcdsList.map((key: string) => {
            const keyreal = key as keyof habcds;
            const val = props.isAttacker
              ? damStore.attacker.feature[keyreal]
              : damStore.opponent.feature[keyreal];
            return (
              <div
                key={key}
                css={css`
                  margin-left: 5px;
                  margin-right: 5px;
                  width: 50px;
                  border-radius: 3px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: ${val === 1.1
                    ? "#ee4444"
                    : val === 0.9
                    ? "#4444ee"
                    : "#bbbbbb"};
                  transition: 0s;
                  ${unselectable}
                `}
                onClick={() => {
                  damStore.setFeature(props.isAttacker, keyreal);
                }}
              >
                {key}
              </div>
            );
          })}
        </div>
        <RenderValues />
      </div>
    </div>
  );
}

export default observer(PokeEditor);
