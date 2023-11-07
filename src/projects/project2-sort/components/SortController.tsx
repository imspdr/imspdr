import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useSortStore } from "../store/SortStoreProvider";
import { unselectable } from "@src/common/util";
import CommonDropDown from "@src/common/CommonDropDown";

function SortController() {
  const sortStore = useSortStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        ${unselectable}
      `}
    >
      <CommonDropDown
        nodes={sortStore.sortAlgos}
        selected={sortStore.selectedAlgo}
        onSelect={(v: string) => {
          sortStore.selectedAlgo = v;
        }}
        width={200}
      />
      <div
        css={css`
          margin-left: 50px;
        `}
        onClick={() => {
          if (sortStore.stopFlag) {
            sortStore.runSort();
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
  );
}

export default observer(SortController);
