import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import LolResult from "./LolResult";
import LolSearch from "./LolSearch";
import LolHiddenButton from "./LolHiddenButton";

function LolMainTemplate() {
  const lolStore = useLolMainStore();
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <LolHiddenButton />
      {lolStore.showResult ? <LolResult /> : <LolSearch />}
    </div>
  );
}

export default observer(LolMainTemplate);
