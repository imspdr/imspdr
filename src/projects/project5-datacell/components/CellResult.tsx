import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { unselectable } from "@src/common/util";
import { useCellStore } from "../store/CellStoreProvider";

function CellTable() {
  const cellStore = useCellStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        overflow: auto;
        border-radius: 10px;
        ${unselectable}
      `}
    >
      {cellStore.numericData.map((num) => {
        return (
          <div>
            num
            {num.name}
            {num.value.length}
          </div>
        );
      })}
      {cellStore.categoricalData.map((num) => {
        return (
          <div>
            cat
            {num.name}
            {num.value.length}
          </div>
        );
      })}
    </div>
  );
}

export default observer(CellTable);
