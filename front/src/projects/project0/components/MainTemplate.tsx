import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useMainStore } from "../store/MainStoreProvider";
import DraggableBadge from "./DraggableBadge";
import { badge } from "../store/types";

function MainPageTemplate() {
  const mainStore = useMainStore();
  return (
    <>
      {mainStore.badges.map((badge: badge) => (
        <DraggableBadge key={`${badge.id}+${badge.title}`} badgeId={badge.id} />
      ))}
    </>
  );
}

export default observer(MainPageTemplate);
