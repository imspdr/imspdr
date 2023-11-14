import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";

function LolResultPage() {
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
    ></div>
  );
}

export default observer(LolResultPage);
