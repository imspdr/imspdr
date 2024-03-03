import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { unselectable } from "@src/common/util";
import { useCallback, useState } from "react";
import { useCellStore } from "../store/CellStoreProvider";
import Histogram from "./Histogram";
import CommonDropDown from "@src/common/CommonDropDown";
import CommonToggle from "@src/common/CommonToggle";
import ScatterPlot from "./ScatterPlot";

function CellResult() {
  const cellStore = useCellStore();
  const [tab, setTab] = useState(0);
  const labels = ["히스토그램", "스캐터 플롯"];

  const ScatterPlotArea = useCallback(() => {
    return (
      <div
        css={css`
          padding: 20px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: 20px;
          `}
        >
          <CommonDropDown
            id={"cell-scatter1"}
            nodes={cellStore.numericData
              .filter((numericCol) => {
                return numericCol.name !== cellStore.scatterColumn2;
              })
              .map((numricCol) => {
                return {
                  label: `x : ${numricCol.name}`,
                  value: numricCol.name,
                };
              })}
            selected={cellStore.scatterColumn1}
            onSelect={(v) => (cellStore.scatterColumn1 = v)}
            width={200}
            height={30}
          />
          <CommonDropDown
            id={"cell-scatter2"}
            nodes={cellStore.numericData
              .filter((numericCol) => {
                return numericCol.name !== cellStore.scatterColumn1;
              })
              .map((numricCol) => {
                return {
                  label: `y : ${numricCol.name}`,
                  value: numricCol.name,
                };
              })}
            selected={cellStore.scatterColumn2}
            onSelect={(v) => (cellStore.scatterColumn2 = v)}
            width={200}
            height={30}
          />
          {cellStore.categoricalData.length > 0 && (
            <CommonDropDown
              id={"cell-scatter3"}
              nodes={cellStore.categoricalData.map((catCol) => {
                return {
                  label: `label : ${catCol.name}`,
                  value: catCol.name,
                };
              })}
              selected={cellStore.scatterLabelColumn}
              onSelect={(v) => (cellStore.scatterLabelColumn = v)}
              width={200}
              height={30}
            />
          )}
        </div>
        {cellStore.scatterColumn1 && cellStore.scatterColumn2 && (
          <ScatterPlot
            width={700}
            height={500}
            numData1={cellStore.scatterData.num1}
            numData2={cellStore.scatterData.num2}
            label={cellStore.scatterData.label}
          />
        )}
      </div>
    );
  }, [cellStore.scatterColumn1, cellStore.scatterColumn2, cellStore.scatterLabelColumn]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        ${unselectable}
      `}
    >
      {cellStore.numericData.length > 0 && (
        <>
          <CommonToggle
            value={tab}
            setValue={(v) => {
              setTab(v);
            }}
            labels={labels}
          />
          {labels[tab] && labels[tab] === "히스토그램" && (
            <div
              css={css`
                padding: 20px;
              `}
            >
              <CommonDropDown
                id={"cell-histogram"}
                nodes={cellStore.numericData.map((numricCol) => {
                  return {
                    label: numricCol.name,
                    value: numricCol.name,
                  };
                })}
                selected={cellStore.selectedColumn}
                onSelect={(v) => (cellStore.selectedColumn = v)}
                width={200}
                height={30}
              />
              {cellStore.selectedColumn && (
                <Histogram
                  width={700}
                  height={500}
                  counts={cellStore.histogramData.counts}
                  bins={cellStore.histogramData.bins}
                />
              )}
            </div>
          )}
          {labels[tab] && labels[tab] === "스캐터 플롯" && <ScatterPlotArea />}
        </>
      )}
    </div>
  );
}

export default observer(CellResult);
