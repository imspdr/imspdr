import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { unselectable } from "@src/common/util";
import { useCellStore } from "../store/CellStoreProvider";
import Histogram from "./Histogram";
import CommonDropDown from "@src/common/CommonDropDown";

function CellResult() {
  const cellStore = useCellStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 800px;
        overflow: auto;
        ${unselectable}
      `}
    >
      {cellStore.numericData.length > 0 && (
        <CommonDropDown
          nodes={cellStore.numericData.map((numricCol) => {
            return {
              label: numricCol.name,
              value: numricCol.name,
            };
          })}
          selected={cellStore.selectedColumn}
          onSelect={(v) => (cellStore.selectedColumn = v)}
          width={200}
        />
      )}
      {cellStore.selectedColumn && (
        <Histogram
          width={600}
          height={300}
          counts={cellStore.histogramData.counts}
          bins={cellStore.histogramData.bins}
        />
      )}
    </div>
  );
}

export default observer(CellResult);
