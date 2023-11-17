import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { lolUser, game, most, tierInfo } from "../store/types";
import { useState } from "react";

function GameCard(props: { game: game }) {
  const game = props.game;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: ${game.win ? "#22cccc" : "#009999"};
        transition: 0s;
        width: 400px;
        height: 30px;
        border-radius: 10px;
        margin-bottom: 5px;
        padding: 10px;
      `}
    >
      <span>{game.win ? "승리" : "패배"}</span>
      <span>{game.championName}</span>
      <span>{`KDA : ${game.kill} / ${game.death} / ${game.assist} `}</span>
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
  const [hover, setHover] = useState(true);
  return (
    <>
      {props.user && (
        <div
          css={css`
            position: relative;
          `}
        >
          {hover && (
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
          )}
          <div
            css={css`
              padding: 20px;
              border: 2px solid;
              border-radius: 20px;
              width: 350px;
            `}
            onClick={() => {
              setHover((v) => !v);
            }}
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
          {hover && (
            <div
              css={css`
                position: absolute;
                left: 450px;
                top: 0px;
              `}
            >
              {props.user.lastGames.map((game) => {
                return <GameCard game={game} />;
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default observer(ProfileCard);
