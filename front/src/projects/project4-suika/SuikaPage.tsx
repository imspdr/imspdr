import CommonTemplate from "@src/common/CommonTemplate";
import { SuikaStoreProvider } from "./store/SuikaStoreProvider";
import SuikaTemplate from "./components/SuikaTemplate";

function SuikaPage() {
  return (
    <SuikaStoreProvider>
      <CommonTemplate title="수박 게임">
        <SuikaTemplate />
      </CommonTemplate>
    </SuikaStoreProvider>
  );
}

export default SuikaPage;
