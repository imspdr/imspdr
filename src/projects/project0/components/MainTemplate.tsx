import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useMainStore } from "../store/MainStoreProvider";
import DraggableBadge from "./draggableBadge/DraggableBadge";
import { badge } from "../store/types";

function MainPageTemplate() {
  const mainStore = useMainStore();
  return (
    <>
      {mainStore.badges.map((badge: badge) => (
        <DraggableBadge badgeId={badge.id} />
      ))}
    </>
  );
}

export default observer(MainPageTemplate);
