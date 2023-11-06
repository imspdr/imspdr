import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useSortStore } from "../store/SortStoreProvider";

function SortController() {
  const sortStore = useSortStore();
  return (
    <div>
      <div
        onClick={() => {
          if (sortStore.stopFlag) {
            sortStore.bubbleSort();
          } else {
            sortStore.stopFlag = true;
          }
        }}
      >
        {sortStore.stopFlag ? "sort!" : "stop!"}
      </div>
      <div>
        {`비교 수 : ${sortStore.compareCount}`}
        {`스왑 수 : ${sortStore.swapCount}`}
      </div>
    </div>
  );
}

export default observer(SortController);
