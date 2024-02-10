import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import CellTable from "./CellTable";
import { useCellStore } from "../store/CellStoreProvider";

function DataReader(props: { width: number; height: number }) {
  const cellStore = useCellStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <label htmlFor="fileinput">
        <div
          css={css`
            border: 1px solid;
            padding: 3px;
            width: 90px;
            margin-bottom: 5px;
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
              const cols = rows.map((row) => row.split(","));
              cellStore.givenData = cols;
            });
          } else {
            cellStore.givenData = [["no Data"]];
          }
        }}
      />
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
