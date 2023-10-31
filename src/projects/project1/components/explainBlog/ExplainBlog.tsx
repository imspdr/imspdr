import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import { unselectable } from "@src/common/Util";

function ExplainBlog(props: { width: number; height: number }) {
  const testTab = [
    { label: "A", value: 0 },
    { label: "B", value: 1 },
    { label: "C", value: 2 },
    { label: "D", value: 3 },
  ];
  const [nowTab, setNowTab] = useState(0);
  const givenHeight = Math.max(props.height, testTab.length * 50 + 10);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: ${givenHeight}px;
      `}
    >
      <div>
        {testTab.map((tab) => {
          return (
            <div
              css={css`
                width: 150px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20px 0px 0px 20px;
                ${nowTab === tab.value
                  ? "border: 5px solid; border-right-width: 0px;"
                  : "border: 0px solid; border-right-width: 5px;"}
                ${unselectable}
              `}
              onClick={() => setNowTab(tab.value)}
            >
              {tab.label}
            </div>
          );
        })}
        <div
          css={css`
            height: ${givenHeight - testTab.length * 50 - 10}px;
            border: 0px solid;
            border-right-width: 5px;
          `}
        ></div>
      </div>
      <div
        css={css`
          width: ${props.width - 150}px;
          border: 5px solid;
          border-left-width: 0px;
        `}
      ></div>
    </div>
  );
}

export default observer(ExplainBlog);
