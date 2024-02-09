import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import DataReader from "./DataReader";

function CellTemplate() {
  return (
    <div
      css={css`
        display: flex;
        padding: 10px;
      `}
    >
      <DataReader />
    </div>
  );
}

export default observer(CellTemplate);
