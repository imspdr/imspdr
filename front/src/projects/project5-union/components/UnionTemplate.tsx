import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useUnionStore } from "../store/UnionStoreProvider";
import UnionInput from "./UnionInput";
import { useEffect, useState } from "react";

function UnionTemplate(props: { width: number }) {
  const unionStore = useUnionStore();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
      `}
    >
      <UnionInput />
    </div>
  );
}

export default observer(UnionTemplate);
