import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSuikaStore } from "../store/SuikaStoreProvider";

import { ReactComponent as PlayIcon } from "@src/images/play.svg";
import { ReactComponent as StopIcon } from "@src/images/stop.svg";
import { ReactComponent as RefreshIcon } from "@src/images/refresh.svg";
import { unselectable } from "@src/common/util";

function SuikaController() {
  const suikaStore = useSuikaStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        border: 3px solid;
        border-radius: 5px;
        margin-top: 10px;
        width: 200px;
        height: 32px;
        ${unselectable}
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
        `}
        onClick={() => {
          suikaStore.posX -= 5;
        }}
      >
        {"<"}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
        `}
        onClick={() => {
          suikaStore.posX += 5;
        }}
      >
        {">"}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
        onClick={() => {
          suikaStore.reset();
        }}
      >
        <RefreshIcon height="15px" width="15px" />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
        onClick={() => {
          if (suikaStore.stopFlag) {
            suikaStore.start();
          } else {
            suikaStore.stop();
          }
        }}
      >
        {suikaStore.stopFlag ? (
          <PlayIcon width="20px" height="20px" />
        ) : (
          <StopIcon width="20px" height="20px" />
        )}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
        `}
        onClick={() => {
          suikaStore.addFruit();
        }}
      >
        {"O"}
      </div>
    </div>
  );
}

export default observer(SuikaController);
