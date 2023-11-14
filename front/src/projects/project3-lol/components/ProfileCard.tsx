import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";

function ProfileCard() {
  const lolStore = useLolMainStore();
  return <></>;
}

export default observer(ProfileCard);
