import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useMainStore } from "../../store/MainStoreProvider";
import { badge } from "../../store/types";

function DraggableBadge(props: { badgeId: number }) {
  const mainStore = useMainStore();
  const styles = getComputedStyle(document.body);
  const badge: badge | undefined = mainStore.badges.find(
    (badge: badge) => badge.id === props.badgeId
  );
  return (
    <>
      {badge && (
        <div
          css={css`
            position: absolute;
            left: ${badge.pos.x - badge.radius}px;
            top: ${badge.pos.y - badge.radius}px;
            width: ${badge.radius * 2}px;
            height: ${badge.radius * 2}px;
            background-color: ${styles.getPropertyValue("--mint")};
            display: flex;
            align-items: center;
            justify-content: center;
          `}
          onMouseDown={(e) => {
            const mousemove = (ev: MouseEvent) => {
              mainStore.setPos(props.badgeId, ev.clientX, ev.clientY);
            };
            const mouseup = () => {
              window.removeEventListener("mousemove", mousemove);
              window.removeEventListener("mouseup", mouseup);
            };
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup);
          }}
        >
          {badge.title}
        </div>
      )}
    </>
  );
}

export default observer(DraggableBadge);
