import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import CommonSearchBar from "@src/common/CommonSearchBar";

function LolSearch() {
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
      <div
        css={css`
          font-size: 70px;
          margin-bottom: 50px;
        `}
      >
        {"IM.SPDR"}
      </div>
      <CommonSearchBar
        onEnter={(v) => {
          lolStore.onSearch(v);
        }}
        onClick={(v) => {
          lolStore.onSearch(v);
        }}
        width={700}
        height={100}
      />
    </div>
  );
}

export default observer(LolSearch);
