import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState, useEffect, useCallback } from "react";
import { pokemonSpecies } from "../store/types";
import { ReactComponent as DropIcon } from "@src/images/dropdown.svg";
import { ReactComponent as BackIcon } from "@src/images/backspace.svg";

const GATAKANA = [
  "アイウエオ",
  "カキクケコ",
  "ガギグゲゴ",
  "サシスセソ",
  "ザジズゼゾ",
  "タチツテト",
  "ダヂヅデド",
  "ナニヌネノ",
  "ハヒフヘホ",
  "バビブベボ",
  "パピプペポ",
  "マミムメモ",
  "ヤーユーヨ",
  "ラリルレロ",
  "ワーヲーン",
];

export default function JapSearch(props: {
  id: string;
  nodes: pokemonSpecies[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const HEIGHT = 30;
  const WIDTH = 90;
  useEffect(() => {
    setSearchText("");
  }, [open]);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const thisElement = document.getElementById(`japsearch-dropdown-${props.id}`);
      const clickedElement = event.target as HTMLDivElement;
      if (!thisElement?.contains(clickedElement)) setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const RenderNodes = useCallback(() => {
    return (
      <>
        {props.nodes
          .filter(
            (node) => node.pokemonName.japanese && node.pokemonName.japanese.includes(searchText)
          )
          .map((node) => {
            if (node.pokemonName.english !== props.selected) {
              return (
                <div
                  key={`japsearch-dropdown-${props.id}${node.pokemonName.english}`}
                  css={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    height: ${HEIGHT}px;
                    width: 310px;
                    padding: 5px 10px;
                    border: 1px solid;
                    border-top: 0px;
                  `}
                  onClick={() => {
                    props.onSelect(node.pokemonName.english);
                    setOpen(false);
                  }}
                >
                  {`${node.pokemonName.japanese} - ${node.pokemonName.korean}`}
                </div>
              );
            } else {
              return <></>;
            }
          })}
      </>
    );
  }, [searchText, props.selected]);

  const Japan = () => {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: row;
          border: 1px solid;
        `}
      >
        {GATAKANA.map((jap) => {
          const japArray = jap.split("");
          return (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `}
            >
              {japArray.map((ja) => {
                return (
                  <div
                    css={css`
                      border: 1px solid;
                      padding: 3px;
                      height: 20px;
                    `}
                    onClick={() => {
                      setSearchText((v) => (v.length > 9 ? v.slice(0, 9) + ja : v + ja));
                    }}
                  >
                    {ja}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      id={`japsearch-dropdown-${props.id}`}
      css={css`
        display: flex;
        flex-direction: column;
        position: relative;
        align-self: flex-end;
        ${unselectable}
      `}
    >
      <div
        css={css`
          border: 2px solid;
          padding: 5px 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          height: ${HEIGHT}px;
          width: ${WIDTH}px;
          ${unselectable}
        `}
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        일본어검색
        <DropIcon width="15px" height="15px" />
      </div>
      {open && (
        <div
          css={css`
            position: absolute;
            top: 44px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-size: 15px;
            z-index: 9;
            border: 1px solid;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              height: ${HEIGHT}px;
              width: 310px;
              padding: 5px 10px;
              border: 1px solid;
            `}
          >
            <span>{searchText}</span>
            <BackIcon
              css={css`
                z-index: 11;
              `}
              onClick={() => {
                setSearchText((v) => {
                  return v.slice(0, v.length - 1);
                });
              }}
            />
          </div>
          <Japan />
          <div
            css={css`
              max-height: 300px;
              overflow: auto;
            `}
          >
            <RenderNodes />
          </div>
        </div>
      )}
    </div>
  );
}
