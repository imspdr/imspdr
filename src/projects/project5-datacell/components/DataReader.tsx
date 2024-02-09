import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";

// const [txt, setTxt] = useState("initial");
// useEffect(() => {
//   {
//     navigator.clipboard.readText().then((txt) => {
//       setTxt(txt);
//     });
//   }
// });
function DataReader() {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {}
    </div>
  );
}

export default observer(DataReader);
