import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import { unselectable } from "@src/common/util";
import { ReactComponent as CloseIcon } from "@src/images/close.svg";

function PokeHistory() {
  const damStore = usePokedamStore();
  return (
    <div
      css={css`
        margin-left: 20px;
        padding: 10px;
        border: 2px solid;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
        min-width: 200px;
        height: 605px;
        overflow: auto;
      `}
    >
      {damStore.history.map((poke, index) => {
        return (
          <div
            css={css`
              border: 1px solid;
              border-radius: 3px;
              width: 170px;
              height: 70px;
              min-height: 80px;
              margin: 5px;
              padding: 5px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              ${unselectable}
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 140px;
              `}
            >
              {poke.title}
              <div
                css={css`
                  display: flex;
                  margin-top: 5px;
                  flex-direction: row;
                `}
              >
                <div
                  css={css`
                    border-radius: 2px;
                    border: 1px solid;
                    padding: 3px;
                  `}
                  onClick={() => {
                    damStore.setPoke(true, poke);
                  }}
                >
                  공격
                </div>
                <div
                  css={css`
                    margin-left: 10px;
                    border-radius: 3px;
                    border: 1px solid;
                    padding: 3px;
                  `}
                  onClick={() => {
                    damStore.setPoke(false, poke);
                  }}
                >
                  수비
                </div>
              </div>
            </div>
            <div
              onClick={() => {
                damStore.history = damStore.history.filter((n, i) => i !== index);
              }}
            >
              <CloseIcon width="15px" height="15px" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default observer(PokeHistory);
