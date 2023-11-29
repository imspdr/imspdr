import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import { useEffect } from "react";
import LolResult from "./LolResult";
import LolSearch from "./LolSearch";
import LolHiddenButton from "./LolHiddenButton";
import CommonTemplate from "@src/common/CommonTemplate";

function LolMainTemplate() {
  const lolStore = useLolMainStore();
  const handleSizeChange = () => {
    lolStore.windowWidth = window.innerWidth;
  };

  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);

  return (
    <CommonTemplate title="LOL 전적 검색" width={lolStore.windowWidth}>
      <div
        css={css`
          position: relative;
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <LolHiddenButton />
        {lolStore.showResult ? <LolResult /> : <LolSearch />}
      </div>
    </CommonTemplate>
  );
}

export default observer(LolMainTemplate);
