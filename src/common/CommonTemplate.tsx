import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { unselectable } from "@src/common/Util";
import CloseIcon from "@mui/icons-material/Close";

export default function CommonTemplate(props: { title: string; children: JSX.Element }) {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        padding: 20px;
        border: 5px solid;
        margin: 20px;
        height: calc(100% - 64px);
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
          <CloseIcon />
        </div>
      </div>
      <div
        css={css`
          margin-top: 20px;
          overflow: auto;
          height: calc(100% - 50px);
        `}
      >
        {props.children}
      </div>
    </div>
  );
}
