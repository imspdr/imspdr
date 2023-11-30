import { ReactComponent as QueenIcon } from "@src/images/queenIcon.svg";
import { ReactComponent as SortIcon } from "@src/images/sortIcon.svg";
import { ReactComponent as SuikaIcon } from "@src/images/watermelon.svg";
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
    comp: <SuikaIcon width={"100px"} height={"100px"} />,
  },
];

export default iconMap;
