import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import { useState } from "react";
import CommonNumberField from "@src/common/CommonNumberField";

function PokeResult() {
  const damStore = usePokedamStore();
  const [techType, setTechType] = useState("grass");
  const [power, setPower] = useState(100);

  return (
    <div
      css={css`
        margin-top: 20px;
        padding: 20px;
        border: 2px solid;
        border-radius: 5px;
      `}
    >
      <CommonNumberField
        value={power}
        onChange={(v: number) => {
          setPower(v);
        }}
        min={0}
        max={300}
      />
      <div>
        {`최소 데미지 : ${Math.floor(
          (((damStore.attacker.real.a * power) / damStore.opponent.real.b) * 0.44 + 2) * 0.85
        )}`}
      </div>
      <div>
        {`최대 데미지 : ${Math.floor(
          ((damStore.attacker.real.a * power) / damStore.opponent.real.b) * 0.44 + 2
        )}`}
      </div>
    </div>
  );
}

export default observer(PokeResult);
