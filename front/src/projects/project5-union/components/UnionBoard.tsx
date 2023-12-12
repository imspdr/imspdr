import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useUnionStore } from "../store/UnionStoreProvider";
import { useEffect, useState } from "react";

function UnionBoard(props: { width: number }) {
  const UnionStore = useUnionStore();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {[...new Array(20)].map((_, index) => {
        return [...new Array(22)].map((_, index) => {
          return (
            <div
              css={css`
                width: 5px;
                height: 5px;
                background-color: #dddddd;
              `}
            ></div>
          );
        });
      })}
    </div>
  );
}

export default observer(UnionBoard);
