import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import { lolUser } from "../store/types";

const sampleUser: lolUser = {
  id: 123,
  name: "asd",
  lastGames: [
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 1,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 1,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 1,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 0,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 1,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 1,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 0,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 1,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 0,
      championName: "asd",
    },
    {
      kill: 0,
      death: 0,
      assist: 0,
      win: 1,
      championName: "asd",
    },
  ],
  mosts: [
    { champ: 123, point: 12345 },
    { champ: 124, point: 12345 },
    { champ: 125, point: 12345 },
    { champ: 126, point: 12345 },
    { champ: 127, point: 12345 },
  ],
};

function ProfileCard() {
  const lolStore = useLolMainStore();
  return (
    <div>
      {sampleUser.name}
      <div>
        {sampleUser.lastGames.map((game) => {
          return (
            <div
              css={css`
                background-color: ${game.win ? "#22cccc" : "#009999"};
                transition: 0s;
              `}
            >
              {`${game.kill} / ${game.death} / ${game.assist}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default observer(ProfileCard);
