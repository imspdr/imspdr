import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { unselectable } from "@src/common/util";
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
          font-size: 30px;
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
          padding: 30px 30px 0px 30px;
          overflow: auto;
          height: calc(100% - 50px);
        `}
      >
        {props.children}
      </div>
    </div>
  );
}
