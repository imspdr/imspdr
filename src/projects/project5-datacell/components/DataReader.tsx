import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { unselectable } from "@src/common/util";
import { useCellStore } from "../store/CellStoreProvider";

function CellTable(props: { data: string[][] }) {
  const WIDTH = 800;
  const HEIGHT = 600;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        overflow: auto;
        border-radius: 10px;
        ${unselectable}
      `}
    >
      {props.data.map((row) => {
        return (
          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            {row.map((col) => {
              return (
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid;
                    width: ${Math.floor(WIDTH / row.length)}px;
                    min-width: 120px;
                    height: 40px;
                  `}
                >
                  {col}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function DataReader(props: { width: number; height: number }) {
  const cellStore = useCellStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 5px;
          ${unselectable}
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: 10px;
          `}
        >
          <label htmlFor="fileinput">
            <div
              css={css`
                border: 1px solid;
                padding: 3px;
                width: 90px;
              `}
            >
              파일 업로드
            </div>
          </label>
          <input
            id="fileinput"
            type="file"
            css={css`
              display: none;
            `}
            onChange={(e) => {
              e.preventDefault();
              let isData = e.target.files?.item(0);
              if (isData) {
                isData.text().then((data) => {
                  const rows = data.split("\n");
                  const cols = rows.map((row) => row.split(",").map((v) => v.replaceAll('"', "")));
                  cellStore.givenData = cols;
                });
              } else {
                cellStore.givenData = [["no Data"]];
              }
            }}
          />

          <div
            css={css`
              border: 1px solid;
              padding: 3px;
              width: 90px;
            `}
            onClick={cellStore.loadSample}
          >
            샘플 데이터
          </div>
        </div>

        <div
          css={css`
            border: 1px solid;
            padding: 3px;
            width: 90px;
          `}
          onClick={cellStore.generateData}
        >
          데이터 등록
        </div>
      </div>

      <div
        css={css`
          display: flex;
          width: ${props.width}px;
          height: ${props.height}px;
          border-radius: 10px;
          border: 1px solid;
          justify-content: center;
          align-items: center;
        `}
        onDrop={(e) => {
          e.preventDefault();
          let isData = e.dataTransfer.files.item(0);
          if (isData) {
            isData.text().then((data) => {
              const rows = data.split("\n");
              const cols = rows.map((row) => row.split(","));
              cellStore.givenData = cols;
            });
          } else {
            cellStore.givenData = [["no Data"]];
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {cellStore.givenData.length > 0 ? (
          <CellTable data={cellStore.givenData} />
        ) : (
          <>{"csv 파일을 끌어서 놓아주세요"}</>
        )}
      </div>
    </div>
  );
}

export default observer(DataReader);
