import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";

export default function PokeType(props: { types: string }) {
  const typeMap = [
    {
      color: "#949495",
      eng: "Normal",
      kor: "노말",
    },
    {
      color: "#e09c40",
      eng: "Fighting",
      kor: "격투",
    },
    {
      color: "#a2c3e7",
      eng: "Flying",
      kor: "비행",
    },
    {
      color: "#735198",
      eng: "Poison",
      kor: "독",
    },
    {
      color: "#9c7743",
      eng: "Ground",
      kor: "땅",
    },
    {
      color: "#bfb889",
      eng: "Rock",
      kor: "바위",
    },
    {
      color: "#9fa244",
      eng: "Bug",
      kor: "벌레",
    },
    {
      color: "#684870",
      eng: "Ghost",
      kor: "고스트",
    },
    {
      color: "#69a9c7",
      eng: "Steel",
      kor: "강철",
    },
    {
      color: "#e56c3e",
      eng: "Fire",
      kor: "불꽃",
    },
    {
      color: "#5185c5",
      eng: "Water",
      kor: "물",
    },
    {
      color: "#66a945",
      eng: "Grass",
      kor: "풀",
    },
    {
      color: "#f6d851",
      eng: "Electric",
      kor: "전기",
    },
    {
      color: "#dd6b7b",
      eng: "Psychic",
      kor: "에스퍼",
    },
    {
      color: "#6dc8eb",
      eng: "Ice",
      kor: "얼음",
    },
    {
      color: "#535ca8",
      eng: "Dragon",
      kor: "드래곤",
    },
    {
      color: "#4c4948",
      eng: "Dark",
      kor: "악",
    },
    {
      color: "#dab4d4",
      eng: "Fairy",
      kor: "페어리",
    },
  ];
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
