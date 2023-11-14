import CommonTemplate from "@src/common/CommonTemplate";
import { LolMainStoreProvider } from "./store/LolMainStoreProvider";
import LolMainTemplate from "./components/LolMainTemplate";

function LolMainPage() {
  return (
    <LolMainStoreProvider>
      <CommonTemplate title="LOL 전적 검색">
        <LolMainTemplate />
      </CommonTemplate>
    </LolMainStoreProvider>
  );
}

export default LolMainPage;
