import { observer } from "mobx-react";
import { css, keyframes } from "@emotion/react";
import { useMainStore } from "../../store/MainStoreProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { badge } from "../../store/types";

function DraggableBadge(props: { badgeId: number }) {
  const mainStore = useMainStore();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [description, setDescription] = useState(false);
  const badge: badge | undefined = mainStore.badges.find(
    (badge: badge) => badge.id === props.badgeId
  );
  return (
    <>
      {badge && (
        <>
          <div
            css={css`
              position: absolute;
              left: ${badge.pos.x - badge.radius - (hover ? 5 : 0)}px;
              top: ${badge.pos.y - badge.radius - (hover ? 5 : 0)}px;
              width: ${badge.radius * 2}px;
              height: ${badge.radius * 2}px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: ${badge.radius}px;
              border: ${hover ? "5px solid" : ""};
              z-index: ${hover ? 10 : 1};
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            `}
            onMouseDown={(e) => {
              const mousemove = (ev: MouseEvent) => {
                mainStore.setPos(props.badgeId, ev.clientX, ev.clientY);
                setDescription(false);
              };
              const mouseup = () => {
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
                setDescription(true);
              };
              window.addEventListener("mousemove", mousemove);
              window.addEventListener("mouseup", mouseup);
            }}
            onMouseOver={(e) => {
              setHover(true);
              setDescription(true);
            }}
            onMouseOut={(e) => {
              setHover(false);
              setDescription(false);
            }}
            onDoubleClick={() => {
              setDescription(false);
              navigate(`/${badge.route}`);
            }}
          >
            {badge.title}
          </div>
          {description && (
            <div
              css={css`
                position: absolute;
                left: ${badge.pos.x + badge.radius + 20}px;
                top: ${badge.pos.y - badge.radius - 10}px;
                border: 3px solid;
                padding: 10px;
                width: 300px;
                min-height: ${badge.radius * 2}px;
                z-index: 10;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              `}
            >
              <div
                css={css`
                  font-size: 20px;
                `}
              >
                {badge.title}
              </div>
              <div
                css={css`
                  font-size: 15px;
                  margin-top: 10px;
                `}
              >
                {badge.description}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default observer(DraggableBadge);
