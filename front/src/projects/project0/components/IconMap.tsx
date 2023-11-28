import { ReactComponent as QueenIcon } from "@src/images/queenIcon.svg";
import { ReactComponent as SortIcon } from "@src/images/sortIcon.svg";
import { css } from "@emotion/react";

const iconMap = [
  {
    label: "queen",
    comp: <QueenIcon width={"100px"} height={"100px"} />,
  },
  {
    label: "sort",
    comp: <SortIcon width={"100px"} height={"100px"} />,
  },
  {
    label: "lol",
    comp: (
      <div
        css={css`
          font-size: 50px;
        `}
      >
        LOL
      </div>
    ),
  },
  {
    label: "suika",
    comp: (
      <div
        css={css`
          font-size: 25px;
        `}
      >
        수박
      </div>
    ),
  },
];

export default iconMap;
