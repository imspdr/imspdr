import { css, keyframes } from "@emotion/react";
import { useState } from "react";

function Dot(props: {
  x: number;
  y: number;
  radius: number;
  label: string;
  setHover: (x: number, y: number, label: string) => void;
  centerX: number;
  centerY: number;
  color?: string;
}) {
  const ddiyong = keyframes`
  0% {
    cx: ${props.centerX};
    cy: ${props.centerY};
  }
  100% {
    cx: ${props.x};
    cy: ${props.y};
  }
`;
  return (
    <>
      <circle
        cx={props.x}
        cy={props.y}
        r={props.radius}
        fill={props.color}
        onMouseOver={() => props.setHover(props.x, props.y, props.label)}
        onMouseOut={() => props.setHover(props.x, props.y, "")}
        css={css`
          animation: ${ddiyong} 1s;
        `}
      />
    </>
  );
}

const fillIndex = [
  "#94d6c5",
  "#3a987f",
  "#d694c6",
  "#c15da9",
  "#ffd700",
  "#645047",
  "#ff8c00",
  "#e65100",
  "#01579b",
  "#c62828",
];

export default function ScatterPlot(props: {
  numData1: number[];
  numData2: number[];
  label?: string[];
  width: number;
  height: number;
}) {
  const xMax = Math.max(...props.numData1);
  const yMax = Math.max(...props.numData2);
  const xMin = Math.min(...props.numData1);
  const yMin = Math.min(...props.numData2);

  const GAP = 20;

  const xSize = (props.width - GAP * 2) / (xMax - xMin);
  const ySize = (props.height - GAP * 2) / (yMax - yMin);

  const uniqueSet = props.label ? Array.from(new Set(props.label)) : ["no label"];

  const [hover, setHover] = useState<undefined | { x: number; y: number; label: string }>(
    undefined
  );
  return (
    <div
      css={css`
        height: ${props.height}px;
        width: ${props.width}px;
      `}
    >
      {props.label && (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
          `}
        >
          {uniqueSet.map((label, index) => {
            return (
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                `}
              >
                <div
                  css={css`
                    width: 14px;
                    height: 14px;
                    border-radius: 7px;
                    background-color: ${fillIndex[index]};
                  `}
                ></div>
                {` : ${label}`}
              </div>
            );
          })}
        </div>
      )}
      <svg viewBox={`0 0 ${props.width} ${props.height}`}>
        {props.numData1.map((num, index) => {
          return (
            <Dot
              x={(num - xMin) * xSize + GAP}
              y={(props.numData2[index]! - yMin) * ySize + GAP}
              centerX={props.width / 2 - GAP}
              centerY={props.height / 2 - GAP}
              radius={5}
              color={
                props.label
                  ? fillIndex[uniqueSet.findIndex((label) => label === props.label![index])]
                  : undefined
              }
              label={`x: ${num.toFixed(2)} y: ${props.numData2[index]!.toFixed(2)}`}
              setHover={(x, y, label) =>
                setHover({
                  x: x,
                  y: y,
                  label: label,
                })
              }
            />
          );
        })}
        {hover && hover.label && (
          <text x={hover.x} y={hover.y - 10} fontSize={10}>
            {hover.label}
          </text>
        )}
      </svg>
    </div>
  );
}
