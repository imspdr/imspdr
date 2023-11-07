import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useSortStore } from "../store/SortStoreProvider";
import { unselectable } from "@src/common/util";

function SortController() {
  const sortStore = useSortStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        align-items: center;
        ${unselectable}
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-even;
          font-size: 20px;
        `}
      >
        <div
          onClick={() => {
            if (sortStore.stopFlag) {
              sortStore.mergeSort();
            } else {
              sortStore.stopFlag = true;
            }
          }}
        >
          {sortStore.stopFlag ? "정렬!" : "멈춰!"}
        </div>
        <div
          css={css`
            margin-left: 50px;
          `}
          onClick={() => {
            sortStore.reset();
          }}
        >
          {"초기화"}
        </div>
      </div>
    </div>
  );
}

export default observer(SortController);
