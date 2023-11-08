import { css } from "@emotion/react";
import CommonTemplate from "@src/common/CommonTemplate";
import { LolMainStoreProvider } from "../store/LolMainStoreProvider";

function LolMainPage() {
  return (
    <LolMainStoreProvider>
      <CommonTemplate title="P=NP와 n-퀸 문제">
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          lol
        </div>
      </CommonTemplate>
    </LolMainStoreProvider>
  );
}

export default LolMainPage;
