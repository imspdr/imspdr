import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { lolUser, game, most, tierInfo, participant } from "../store/types";
import { useState } from "react";
import { unselectable } from "@src/common/util";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useLolMainStore } from "../store/LolMainStoreProvider";

function GameDetail(props: { participants: participant[] }) {
  const maxDeal = Math.max(...props.participants.map((part) => part.deal));
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          width: 400px;
        `}
      >
        {props.participants
          .filter((part) => part.win === 1)
          .map((part) => {
            return (
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 200px;
                    height: 70px;
                    padding: 10px;
                  `}
                >
                  <span>{part.name}</span>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      justify-content: space-between;
                      width: 180px;
                      align-items: center;
                    `}
                  >
                    <span>{`${part.kill} / ${part.death} / ${part.assist} `}</span>
                    <span>{part.championName}</span>
                  </div>
                </div>
                <div
                  css={css`
                    background-color: #22cccc;
                    transition: 0s;
                    width: ${(180 * part.deal) / maxDeal}px;
                    height: 30px;
                  `}
                ></div>
              </div>
            );
          })}
      </div>
      <div
        css={css`
          margin-left: 50px;
          width: 400px;
        `}
      >
        {props.participants
          .filter((part) => part.win === 0)
          .map((part) => {
            return (
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-end;
                `}
              >
                <div
                  css={css`
                    background-color: #009999;
                    transition: 0s;
                    width: ${(180 * part.deal) / maxDeal}px;
                    height: 30px;
                  `}
                ></div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 200px;
                    height: 70px;
                    padding: 10px;
                  `}
                >
                  <span>{part.name}</span>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      justify-content: space-between;
                      width: 180px;
                      align-items: center;
                    `}
                  >
                    <span>{part.championName}</span>
                    <span>{`${part.kill} / ${part.death} / ${part.assist} `}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function GameCard(props: { game: game }) {
  const game = props.game;
  const bgcolor = game.myPlay.win ? "#22cccc" : "#009999";
  const [hover, setHover] = useState(false);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: 0s;
        width: 400px;
        height: 30px;
        border-radius: 10px;
        padding: ${hover ? "8px" : "10px"};
        ${hover ? "border: 2px solid;" : `background-color: ${bgcolor};`}
      `}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <span>{game.myPlay.win ? "승리" : "패배"}</span>
      <span>{game.myPlay.championName}</span>
      <span>{`KDA : ${game.myPlay.kill} / ${game.myPlay.death} / ${game.myPlay.assist} `}</span>
    </div>
  );
}

function TierCard(props: { tier: tierInfo }) {
  const tier = props.tier;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: 0s;
        width: 300px;
        height: 30px;
        border-radius: 10px;
        margin-bottom: 5px;
        padding: 10px;
      `}
    >
      <span>
        {tier.queueType === "RANKED_FLEX_SR"
          ? "자유"
          : tier.queueType === "RANKED_SOLO_5x5"
          ? "솔로"
          : "기타"}{" "}
      </span>
      <span>{tier.tier + " " + tier.rank + " " + tier.leaguePoints + "p"}</span>
      <span>{`${tier.wins} 승 ${tier.losses} 패`}</span>
    </div>
  );
}

function MostCard(props: { most: most }) {
  const most = props.most;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: 0s;
        width: 250px;
        height: 30px;
        border-radius: 10px;
        margin-bottom: 5px;
        padding: 10px;
      `}
    >
      <span>{most.champ}</span>
      <span>{most.point}</span>
    </div>
  );
}

function ProfileCard(props: { user: lolUser | undefined }) {
  const lolStore = useLolMainStore();
  const [gameIndex, setGameIndex] = useState(-1);
  return (
    <>
      {props.user && (
        <div
          css={css`
            position: relative;
            ${unselectable}
          `}
        >
          <div
            css={css`
              position: absolute;
              left: 50px;
              top: 250px;
            `}
          >
            {props.user.mosts.map((mo: most) => (
              <MostCard most={mo} />
            ))}
          </div>
          <div
            css={css`
              padding: 20px;
              border: 2px solid;
              border-radius: 20px;
              width: 350px;
            `}
          >
            <div
              css={css`
                font-size: 30px;
                margin-bottom: 10px;
              `}
            >
              {props.user.name}
            </div>
            <div>
              {props.user.tierList.map((tier: tierInfo) => (
                <TierCard tier={tier} />
              ))}
            </div>
          </div>
          <div
            css={css`
              position: absolute;
              left: 450px;
              top: 0px;
              height: 580px;
              overflow: auto;
            `}
          >
            {props.user.lastGames.map((game, index) => {
              return (
                <div
                  css={css`
                    margin-bottom: 5px;
                  `}
                  onClick={() => setGameIndex((v) => (v === index ? -1 : index))}
                >
                  <GameCard game={game} />
                </div>
              );
            })}
            {props.user.lastGames.length >= 10 && (
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
          {gameIndex >= 0 &&
            gameIndex < props.user.lastGames.length &&
            props.user.lastGames[gameIndex] && (
              <div
                css={css`
                  position: absolute;
                  left: 900px;
                  top: 0px;
                `}
              >
                <GameDetail participants={props.user.lastGames[gameIndex]!.participants} />
              </div>
            )}
        </div>
      )}
    </>
  );
}

export default observer(ProfileCard);
