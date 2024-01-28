import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { unselectable } from "@src/common/util";
import { ReactComponent as CloseIcon } from "@src/images/close.svg";

export default function CommonTemplate(props: {
  title: string;
  children: JSX.Element;
  width?: number;
}) {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        padding: 10px;
        margin: 2px;
        border: 3px solid;
        height: calc(100% - 64px);
        min-height: 500px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 30px;
          font-size: 20px;
          ${unselectable}
        `}
      >
        <div>{props.title}</div>
        <div
          onClick={() => {
            navigate("/");
          }}
          css={css`
            width: 20px;
            height: 20px;
          `}
        >
          <CloseIcon width="20px" height="20px" />
        </div>
      </div>
      <div
        css={css`
          overflow: auto;
          margin-top: 10px;
          height: calc(100% - 50px);
        `}
      >
        {props.children}
      </div>
    </div>
  );
}
