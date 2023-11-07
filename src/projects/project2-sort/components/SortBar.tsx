import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSortStore } from "../store/SortStoreProvider";
import { bar } from "../store/SortStore";

function Bar(props: { state: string; value: number; max: number; height: number; width: number }) {
  return (
    <div
      css={css`
        height: ${(props.height * props.value) / props.max}px;
        width: ${props.width}px;
        border: 1px solid;
        ${props.state === "compare"
          ? "color: #00dddd;"
          : props.state === "moving"
          ? "color: #dddd00;"
          : ""}
      `}
    ></div>
  );
}

function SortBar(props: { height: number }) {
  const sortStore = useSortStore();
  const max = Math.max(...sortStore.numberArray.map((bar: bar) => bar.value));
  const width = Math.round(props.height / sortStore.numberArray.length);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: flex-end;
      `}
    >
      {sortStore.numberArray.map((bar: bar) => {
        return (
          <Bar state={bar.state} value={bar.value} max={max} height={props.height} width={width} />
        );
      })}
    </div>
  );
}

export default observer(SortBar);
