import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import CommonTextField from "@src/common/CommonTextField";
import { unselectable } from "@src/common/util";

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

export default observer(CellTable);
