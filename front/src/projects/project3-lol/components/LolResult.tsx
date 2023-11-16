import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import ProfileCard from "./ProfileCard";
import CommonLoading from "@src/common/CommonLoading";

function LolResult() {
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
      <ProfileCard />
      <CommonLoading width={300} fontSize={50} />
    </div>
  );
}

export default observer(LolResult);
