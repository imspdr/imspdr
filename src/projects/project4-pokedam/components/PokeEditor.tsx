import { css } from "@emotion/react";
import { useCallback } from "react";
import { pokemon, habcds } from "../store/types";
import { observer } from "mobx-react";
import CommonNumberField from "@src/common/CommonNumberField";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import { unselectable } from "@src/common/util";

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
  }, [props.isAttacker ? damStore.attacker : damStore.opponent]);

  return (
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
                background-color: ${val === 1.1 ? "#ee4444" : val === 0.9 ? "#4444ee" : "#bbbbbb"};
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
  );
}

export default observer(PokeEditor);
