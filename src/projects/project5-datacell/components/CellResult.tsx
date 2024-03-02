import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { unselectable } from "@src/common/util";
import { useCellStore } from "../store/CellStoreProvider";
import Histogram from "./Histogram";

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
      <Histogram
        width={600}
        height={300}
        counts={[2, 3, 5, 8, 13, 5, 2]}
        bins={[10, 20, 30, 40, 50, 60, 70, 80]}
      />
    </div>
  );
}

export default observer(CellTable);
