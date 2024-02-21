import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import DataReader from "./DataReader";
import CellResult from "./CellResult";

function CellTemplate() {
  return (
    <div
      css={css`
        display: flex;
        padding: 10px;
      `}
    >
      <DataReader width={800} height={600} />
      <CellResult />
    </div>
  );
}

export default observer(CellTemplate);
