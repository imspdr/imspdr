import { css } from "@emotion/react";
import { observer } from "mobx-react";
import SuikaBoard from "./SuikaBoard";
import SuikaHelp from "./SuikaHelp";
import SuikaController from "./SuikaController";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import { useEffect, useState } from "react";

function SuikaTemplate(props: { width: number }) {
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
        align-items: center;
        justify-content: center;
        flex-direction: "row";
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <SuikaBoard />
        <SuikaController />
      </div>
      {props.width > 500 && <SuikaHelp />}
    </div>
  );
}

export default observer(SuikaTemplate);
