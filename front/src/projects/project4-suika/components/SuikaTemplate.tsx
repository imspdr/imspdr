import { css } from "@emotion/react";
import { observer } from "mobx-react";
import SuikaBoard from "./SuikaBoard";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { useEffect } from "react";

function SuikaTemplate() {
  const suikaStore = useSuikaStore();
  const keyDownEvent = (ev: KeyboardEvent) => {
    if (ev.key === "ArrowRight") {
      suikaStore.posX += 5;
    } else if (ev.key === "ArrowLeft") {
      suikaStore.posX -= 5;
    } else if (ev.key === "Enter") {
      suikaStore.addFruit();
    } else if (ev.key === " ") {
      if (suikaStore.stopFlag) {
        suikaStore.start();
      } else {
        suikaStore.stop();
      }
    } else if (ev.key === "r") {
      suikaStore.reset();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", keyDownEvent);
    return () => window.removeEventListener("keydown", keyDownEvent);
  }, []);
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
      <div onClick={() => (suikaStore.posX -= 10)}>{"<<"}</div>
      <div onClick={() => (suikaStore.posX += 10)}>{">>"}</div>
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
