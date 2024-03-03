import { css, keyframes } from "@emotion/react";
import { useState, useEffect } from "react";

function SingleBar(props: {
  num: number;
  maxHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
}) {
  const [hover, setHover] = useState(false);
  const ddiyong = keyframes`
    0% {
      height: 0px;
      y: ${props.maxHeight}
    }
    100% {
      height: ${props.height}px;
      y: ${props.maxHeight - props.height}
    }
  `;
  return (
    <>
      <rect
        width={props.width}
        height={props.height}
        x={props.x}
        y={props.y}
        fill="transparent"
        className="with-stroke"
        css={css`
          animation: ${ddiyong} 1s;
        `}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      />
      {hover && (
        <text x={props.x + 5} y={props.y - 10} fontSize={10} fill="black">
          {props.num}
        </text>
      )}
    </>
  );
}

export default function Histogram(props: {
  counts: number[];
  bins: number[];
  width: number;
  height: number;
}) {
  const maxCount = Math.max(...props.counts);
  const LEFTGAP = 50;
  const TOPGAP = 50;
  const RIGHTGAP = 50;
  const BOTTOMGAP = 50;

  const BINFONTSIZE = 10;

  const chartWidth = props.width - LEFTGAP - RIGHTGAP;
  const chartHeight = props.height - BOTTOMGAP - TOPGAP;

  const xWidth = Math.floor(chartWidth / props.counts.length);

  return (
    <div
      css={css`
        height: ${props.height}px;
        width: ${props.width}px;
      `}
    >
      <svg viewBox={`0 0 ${props.width} ${props.height}`}>
        {props.counts.map((num: number, index: number) => {
          const x = index * xWidth + 1 + LEFTGAP;
          const yHeight = Math.floor((chartHeight * num) / maxCount);
          const y = chartHeight - yHeight + TOPGAP;
          return (
            <SingleBar
              num={num}
              x={x}
              y={y}
              width={xWidth}
              height={yHeight}
              maxHeight={chartHeight + TOPGAP}
            />
          );
        })}
        {props.bins.map((num: number, index: number) => {
          const x = index * xWidth + LEFTGAP - BINFONTSIZE;
          const y = chartHeight + TOPGAP + BOTTOMGAP / 2;
          return (
            <text x={x} y={y} fontSize={BINFONTSIZE} fill="black">
              {num}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
