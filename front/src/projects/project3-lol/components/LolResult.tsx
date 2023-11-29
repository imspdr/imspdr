import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import CommonLoading from "@src/common/CommonLoading";
import CommonSearchBar from "@src/common/CommonSearchBar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { unselectable } from "@src/common/util";
import { useState } from "react";
import GameDetail from "./result/LolGameDetail";
import GameCard from "./result/LolGameCard";
import ProfileCard from "./result/LolProfileCard";

function LolResult() {
  const lolStore = useLolMainStore();
  const [gameIndex, setGameIndex] = useState(-1);
  const user = lolStore.nowUsers[lolStore.nowIndex];
  return (
    <div
      css={css`
        display: flex;
        padding: 20px;
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
          width={Math.min(lolStore.windowWidth - 200, 400)}
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
          margin-top: 50px;
        `}
      >
        {lolStore.loading ? (
          <CommonLoading width={300} fontSize={50} />
        ) : lolStore.nowIndex === -1 ? (
          <div>{"뭔가... 잘못됐습니다... API 토큰 문제일 가능성이 높습니다..."}</div>
        ) : (
          user && (
            <>
              <ProfileCard user={user} />
              <div>
                {user.lastGames.map((game, index) => {
                  return (
                    <div
                      css={css`
                        margin-bottom: 5px;
                      `}
                      onClick={() => setGameIndex((v) => (v === index ? -1 : index))}
                    >
                      <GameCard game={game} width={300} />
                    </div>
                  );
                })}
                {user.lastGames.length >= 10 && (
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    `}
                    onClick={() => lolStore.getMoreMatch()}
                  >
                    <KeyboardDoubleArrowDownIcon />
                  </div>
                )}
              </div>
              {gameIndex >= 0 && gameIndex < user.lastGames.length && user.lastGames[gameIndex] && (
                <GameDetail width={760} participants={user.lastGames[gameIndex]!.participants} />
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}

export default observer(LolResult);
