import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import { useEffect, useState } from "react";
import CommonNumberField from "@src/common/CommonNumberField";
import PokeType from "./PokeType";
import { typeMap, type2type, typeList } from "../store/pokeInfo";
import CommonDropDown from "@src/common/CommonDropDown";
import { unselectable } from "@src/common/util";

function PokeResult() {
  const damStore = usePokedamStore();
  const [techType, setTechType] = useState("Normal");
  const [isTera, setTera] = useState(false);
  const [isPhy, setPhy] = useState(true);
  const [power, setPower] = useState(100);
  const [baeyoul, setBaeyoul] = useState<number[]>([]);

  const [defbaeyoul, setDefBaeyoul] = useState<number[]>([]);

  const [eff, setEff] = useState(1);
  const [dam, setDam] = useState(1);

  const thisType = typeMap.find((tm) => tm.eng === techType);

  const factors = [2, 1.5, 1.3, 1.2, 1.1, 0.5];
  useEffect(() => {
    setTechType(damStore.attacker.pokemonType[0] ? damStore.attacker.pokemonType[0] : "Normal");
  }, [damStore.attacker]);

  useEffect(() => {
    let tempNum = 1;
    baeyoul.forEach((v) => (tempNum *= v));
    if (isTera) {
      if (damStore.attacker.pokemonType.includes(techType)) {
        tempNum *= 2;
      } else {
        tempNum *= 1.5;
      }
    } else {
      if (damStore.attacker.pokemonType.includes(techType)) {
        tempNum *= 1.5;
      }
    }
    const defType: number[] = damStore.opponent.pokemonType.map((tt) => {
      const kortype = typeMap.find((tm) => tm.eng === tt)?.kor;
      return typeList.findIndex((v) => v === kortype);
    });
    let effNum = 1;
    defType.forEach((v: number) => {
      const x = type2type[v];
      const kortype = typeMap.find((tm) => tm.eng === techType)?.kor;
      const y = x ? x[typeList.findIndex((v) => v === kortype)] : 1;
      effNum *= y ? y : 1;
    });
    setEff(effNum);

    const factor = tempNum * effNum;
    tempNum = 1;
    defbaeyoul.forEach((v) => (tempNum *= v));

    const defactor = tempNum;
    setDam(
      Math.floor(
        Math.floor(
          (((isPhy ? damStore.attacker.real.a : damStore.attacker.real.c) * power) /
            (isPhy ? damStore.opponent.real.b : damStore.opponent.real.d) /
            defactor) *
            0.44 +
            2
        ) * factor
      )
    );
  }, [
    power,
    isPhy,
    baeyoul,
    isTera,
    techType,
    defbaeyoul,
    isPhy,
    damStore.attacker,
    damStore.opponent,
  ]);
  return (
    <div
      css={css`
        margin-top: 20px;
        padding: 20px;
        border: 2px solid;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          사용 기술
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            <div
              css={css`
                margin: 0px 20px;
              `}
            >
              타입
            </div>
            <CommonDropDown
              width={80}
              height={20}
              nodes={typeMap.map((tt) => {
                return {
                  label: tt.kor,
                  value: tt.eng,
                };
              })}
              selected={techType}
              search
              maxHeight={150}
              onSelect={(v) => setTechType(v)}
            />
            <div
              css={css`
                margin: 0px 20px;
              `}
            >
              위력
            </div>
            <CommonNumberField
              value={power}
              onChange={(v: number) => {
                setPower(v);
              }}
              min={0}
              max={300}
            />
            <div
              css={css`
                padding: 5px;
                border: 1px solid;
                border-radius: 3px;
                margin: 3px;
                ${unselectable}
              `}
              onClick={() => setPhy((v) => !v)}
            >
              {isPhy ? "물리" : "특수"}
            </div>
          </div>
          <div
            css={css`
              height: 50px;
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            공격 배율 추가 :
            {factors.map((num) => {
              return (
                <div
                  css={css`
                    padding: 5px;
                    border: 1px solid;
                    border-radius: 3px;
                    margin: 3px;
                    ${unselectable}
                  `}
                  onClick={() => setBaeyoul((v) => [...v.filter((_, i) => i < 4), num])}
                >
                  {`x ${num}`}
                </div>
              );
            })}
            <div
              css={css`
                padding: 5px;
                border: 1px solid;
                border-radius: 3px;
                margin: 3px;
                ${unselectable}
              `}
              onClick={() => setBaeyoul([])}
            >
              {" "}
              초기화
            </div>
          </div>
          <div
            css={css`
              height: 50px;
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            방어 배율 추가 :
            {factors.map((num) => {
              return (
                <div
                  css={css`
                    padding: 5px;
                    border: 1px solid;
                    border-radius: 3px;
                    margin: 3px;
                    ${unselectable}
                  `}
                  onClick={() => setDefBaeyoul((v) => [...v.filter((_, i) => i < 4), num])}
                >
                  {`x ${num}`}
                </div>
              );
            })}
            <div
              css={css`
                padding: 5px;
                border: 1px solid;
                border-radius: 3px;
                margin: 3px;
                ${unselectable}
              `}
              onClick={() => setDefBaeyoul([])}
            >
              {" "}
              초기화
            </div>
          </div>
          <div
            css={css`
              border-radius: 5px;
              transition: 0s;
              padding: 5px;
              ${thisType && isTera && `background-color: ${thisType.color};`}
              ${unselectable}
            `}
            onClick={() => setTera((v) => !v)}
          >
            테라스탈
          </div>
        </div>
      </div>
      <div>
        <div>{`상성 : ${eff} 배`}</div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            height: 50px;
            width: 400px;
          `}
        >
          적용 공격 배율 :
          {baeyoul.map((num, index) => {
            return (
              <div
                css={css`
                  padding: 5px;
                  border: 1px solid;
                  border-radius: 3px;
                  margin: 3px;
                  height: 20px;
                  ${unselectable}
                `}
                onClick={() => {
                  setBaeyoul((v) => v.filter((n, i) => i !== index));
                }}
              >
                {`x${num}`}
              </div>
            );
          })}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            height: 50px;
            width: 400px;
          `}
        >
          적용 방어 배율 :
          {defbaeyoul.map((num, index) => {
            return (
              <div
                css={css`
                  padding: 5px;
                  border: 1px solid;
                  border-radius: 3px;
                  margin: 3px;
                  height: 20px;
                  ${unselectable}
                `}
                onClick={() => {
                  setDefBaeyoul((v) => v.filter((n, i) => i !== index));
                }}
              >
                {`x${num}`}
              </div>
            );
          })}
        </div>
        <div
          css={css`
            font-size: 20px;
          `}
        >
          {`데미지 : ${Math.floor(dam * 0.85)}~${dam} (${Math.round(
            (dam / damStore.opponent.real.h) * 85
          )} ~ ${Math.round((dam / damStore.opponent.real.h) * 100)} %)`}
        </div>
      </div>
    </div>
  );
}

export default observer(PokeResult);
