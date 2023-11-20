import { css } from "@emotion/react";
import { observer } from "mobx-react";
import SuikaBoard from "./SuikaBoard";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

function SuikaTemplate() {
  const suikaStore = useSuikaStore();
  return (
    <div
      css={css`
        width: 500px;
        height: 700px;
        display: flex;
        flex-direction: row;
      `}
    >
      <SuikaBoard />
      <div
        css={css`
          margin-left: 50px;
          border: 3px solid;
          border-radius: 10px;
          width: 70px;
          height: 70px;
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
          <PlayArrowIcon
            css={css`
              color: var(--darkorange);
            `}
            fontSize="large"
          />
        ) : (
          <StopIcon fontSize="large" />
        )}
      </div>
      <div
        onClick={() => {
          suikaStore.addFruit();
        }}
      >
        생성기
      </div>
    </div>
  );
}

export default observer(SuikaTemplate);
