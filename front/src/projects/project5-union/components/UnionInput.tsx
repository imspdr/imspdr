import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useUnionStore } from "../store/UnionStoreProvider";
import { unionVal, jobUnion, RANK } from "../store/types";
import CommonNumberField from "@src/common/CommonNumberField";
import { useEffect, useState } from "react";

function UnionInput() {
  const unionStore = useUnionStore();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 2px solid;
        padding: 10px;
        border-radius: 10px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        `}
      >
        <span
          css={css`
            width: 100px;
            margin-right: 10px;
          `}
        >
          {"랭크"}
        </span>
        <>
          {RANK.map((val: string) => {
            return (
              <span
                css={css`
                  width: 60px;
                `}
              >
                {val}
              </span>
            );
          })}
        </>
      </div>
      {unionStore.unionState.map((jobUnion: jobUnion) => {
        return (
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <span
              css={css`
                width: 100px;
                margin-right: 10px;
              `}
            >
              {jobUnion.job}
            </span>
            <>
              {jobUnion.values.map((val: unionVal) => {
                return (
                  <CommonNumberField
                    value={val.num}
                    unit={""}
                    onChange={(v) => unionStore.setUnion(jobUnion.job, val.rank, v)}
                    min={0}
                    max={42}
                    width={60}
                  />
                );
              })}
            </>
          </div>
        );
      })}
    </div>
  );
}

export default observer(UnionInput);
