import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function CommonSearchBar(props: {
  value: string;
  onChange: (v: string) => void;
  onEnter: (v: string) => void;
  height?: number;
  width?: number;
  customCss?: string;
}) {
  const [tempVal, setTempVal] = useState<string>(props.value);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding: 5px;
        border: 3px solid;
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
          setTempVal(e.target.value);
        }}
        onBlur={(e) => {}}
        css={css`
          width: 50px;
          height: 40px;
          ${props.height && `height: ${props.height}px;`}
          ${props.width && `width: ${props.width * 0.8}px;`}
          border: 0px;
          font-size: ${props.height ? props.height * 0.3 + "px" : "15px"};
          margin-right: 5px;
        `}
      />
      <SearchIcon
        css={css`
          width: 50px;
          height: 40px;
          ${props.height && `height: ${props.height}px;`}
          ${props.width && `width: ${props.width * 0.2}px;`}
          border: 0px;
          font-size: ${props.height ? props.height * 0.3 + "px" : "15px"};
        `}
      />
    </div>
  );
}
