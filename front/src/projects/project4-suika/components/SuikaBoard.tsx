import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import { fruit } from "../store/types";

function SuikaBoard() {
  const suikaStore = useSuikaStore();
  return (
    <svg viewBox="0 0 500 700">
      <circle cx={suikaStore.posX} cy={0} r={suikaStore.nowRadius} />
      {suikaStore.fruits.map((fruit: fruit) => {
        return <circle cx={fruit.pos.x} cy={fruit.pos.y} r={fruit.radius} />;
      })}
    </svg>
  );
}

export default observer(SuikaBoard);
