import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useMainStore } from "../store/MainStoreProvider";
import { useNavigate } from "react-router-dom";
import { badge } from "../store/types";
import iconMap from "./IconMap";
import { unselectable } from "@src/common/util";
import { useEffect } from "react";

function MobileBadge(props: { badgeId: number }) {
  const mainStore = useMainStore();
  const navigate = useNavigate();
  const badge: badge | undefined = mainStore.badges.find(
    (badge: badge) => badge.id === props.badgeId
  );

  return (
    <>
      {badge && (
        <>
          <div
            onClick={() => {
              navigate(`/${badge.route}`);
            }}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 3px solid;
              margin: 10px;
              width: ${mainStore.windowWidth / 2 - 40}px;
              height: ${mainStore.windowWidth / 2 - 40}px;
              ${unselectable}
            `}
          >
            {iconMap.find((icon) => icon.label === badge.icon)?.comp}
            <span
              css={css`
                margin-top: 10px;
              `}
            >
              {badge.title}
            </span>
          </div>
        </>
      )}
    </>
  );
}

function MobileTemplate() {
  const mainStore = useMainStore();
  const handleSizeChange = () => {
    mainStore.windowHeight = window.innerHeight;
    mainStore.windowWidth = window.innerWidth;
  };

  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: ${mainStore.windowWidth / 2 - 10}px ${mainStore.windowWidth / 2 -
          10}px;
      `}
    >
      {mainStore.badges.map((badge: badge) => (
        <MobileBadge key={`${badge.id}+${badge.title}`} badgeId={badge.id} />
      ))}
    </div>
  );
}

export default observer(MobileTemplate);
