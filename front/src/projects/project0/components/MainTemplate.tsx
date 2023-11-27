import { observer } from "mobx-react";
import { useEffect } from "react";
import { css } from "@emotion/react";
import { useMainStore } from "../store/MainStoreProvider";
import DraggableBadge from "./DraggableBadge";
import { badge } from "../store/types";

function MainPageTemplate() {
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

  useEffect(() => {
    mainStore.rearrange();
  }, [mainStore.windowWidth, mainStore.windowHeight]);

  return (
    <>
      {mainStore.badges.map((badge: badge) => (
        <DraggableBadge key={`${badge.id}+${badge.title}`} badgeId={badge.id} />
      ))}
    </>
  );
}

export default observer(MainPageTemplate);
