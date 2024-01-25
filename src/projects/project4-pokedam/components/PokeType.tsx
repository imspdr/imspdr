import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { typeMap } from "../store/pokeInfo";

export default function PokeType(props: { types: string }) {
  const thisType = typeMap.find((tm) => tm.eng === props.types);
  return (
    <div
      css={css`
        border-radius: 5px;
        width: 50px;
        height: 30px;
        margin: 0px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0s;
        ${thisType && `background-color: ${thisType.color};`}
        ${unselectable}
      `}
    >
      {thisType?.kor}
    </div>
  );
}
