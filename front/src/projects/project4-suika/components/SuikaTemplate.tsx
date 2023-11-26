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
        display: flex;
        flex-direction: row;
      `}
    >
      <SuikaBoard />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 400px;
          margin-left: 30px;
        `}
      >
        <div
          css={css`
            margin: 30px;
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
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <span>{"조작법 : "}</span>
          <span>{"Space (멈춤 / 시작)"}</span>
          <span>{"방향키 <- -> (좌우 이동)"}</span>
          <span>{"Enter (과일 드랍)"}</span>
          <span>{" R (리셋)"}</span>
        </div>
      </div>
    </div>
  );
}

export default observer(SuikaTemplate);
