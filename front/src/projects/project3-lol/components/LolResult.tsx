import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import ProfileCard from "./ProfileCard";
import CommonLoading from "@src/common/CommonLoading";
import CommonSearchBar from "@src/common/CommonSearchBar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { unselectable } from "@src/common/util";

function LolResult() {
  const lolStore = useLolMainStore();
  return (
    <div
      css={css`
        display: flex;
        padding: 20px;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <div
          css={css`
            padding-right: 20px;
          `}
          onClick={() => (lolStore.showResult = false)}
        >
          <ArrowBackIosNewIcon />
        </div>
        <CommonSearchBar
          onEnter={(v) => {
            lolStore.onSearch(v);
          }}
          onClick={(v) => {
            lolStore.onSearch(v);
          }}
          width={400}
          height={50}
        />
        <div
          css={css`
            margin-left: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          {"히스토리 : "}
          {lolStore.nowUsers.map((user, index) => {
            return (
              <div
                css={css`
                  margin-left: 15px;
                  ${unselectable}
                `}
                onClick={() => (lolStore.nowIndex = index)}
              >
                {user.name + (index === lolStore.nowUsers.length - 1 ? "" : ",")}
              </div>
            );
          })}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          margin-top: 50px;
        `}
      >
        {lolStore.loading ? (
          <CommonLoading width={300} fontSize={50} />
        ) : lolStore.nowIndex === -1 ? (
          <div>{"뭔가... 잘못됐습니다... API 토큰 문제일 가능성이 높습니다..."}</div>
        ) : (
          <ProfileCard user={lolStore.nowUsers[lolStore.nowIndex]} />
        )}
      </div>
    </div>
  );
}

export default observer(LolResult);
