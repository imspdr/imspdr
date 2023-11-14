import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import LolResult from "./LolResult";
import LolSearch from "./LolSearch";

function LolMainTemplate() {
  const lolStore = useLolMainStore();
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      {lolStore.showResult ? <LolResult /> : <LolSearch />}
    </div>
  );
}

export default observer(LolMainTemplate);
