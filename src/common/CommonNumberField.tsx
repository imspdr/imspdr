import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function CommonNumberField(props: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
  height?: number;
  width?: number;
  customCss?: string;
}) {
  const [tempVal, setTempVal] = useState(props.value);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding: 5px;
        min-width: 50px;
        min-height: 40px;
        ${props.customCss && props.customCss}
        ${props.height && `height: ${props.height}px;`}
        ${props.width && `width: ${props.width}px;`}
        ${unselectable}
      `}
    >
      <input
        value={tempVal}
        onChange={(e) => {
          if (Number(e.target.value)) {
            setTempVal(Number(e.target.value));
          } else {
            setTempVal(props.value);
          }
        }}
        onBlur={(e) => {
          if (tempVal) {
            if (tempVal > props.max) {
              setTempVal(props.max);
              props.onChange(props.max);
            } else if (tempVal < props.min) {
              setTempVal(props.min);
              props.onChange(props.min);
            } else {
              props.onChange(tempVal);
            }
          } else {
            setTempVal(props.value);
          }
        }}
        css={css`
          ${props.height && `height: ${props.height}px;`}
          ${props.width && `width: ${props.width}px;`}
          border: 0px;
          width: 50px;
          font-size: 15px;
          height: 40px;
          margin-right: 5px;
        `}
      />
      {props.unit}
    </div>
  );
}
