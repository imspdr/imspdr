import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSortStore } from "../store/SortStoreProvider";
import { bar } from "../store/SortStore";

function Bar(props: { state: string; value: number; height: number; width: number }) {
  return (
    <div
      css={css`
        height: ${(props.height * props.value) / 1000}px;
        width: ${props.width}px;
        ${props.state === "compare"
          ? "background-color: #00ff00;"
          : props.state === "moving"
          ? "background-color: #0000ff;"
          : "background-color: #dddddd;"}
        transition: background-color 0.1s;
      `}
    ></div>
  );
}

function SortBar(props: { width: number; height: number }) {
  const sortStore = useSortStore();
  const width = props.width / sortStore.numberArray.length;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        height: ${props.height}px;
      `}
    >
      {sortStore.numberArray.map((bar: bar) => {
        return <Bar state={bar.state} value={bar.value} height={props.height} width={width} />;
      })}
    </div>
  );
}

export default observer(SortBar);
