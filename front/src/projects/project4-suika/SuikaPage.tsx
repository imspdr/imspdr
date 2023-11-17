import CommonTemplate from "@src/common/CommonTemplate";
import { SuikaStoreProvider } from "./store/SuikaStoreProvider";

function SuikaPage() {
  return (
    <SuikaStoreProvider>
      <CommonTemplate title="수박 게임">
        <div>{"suika~"}</div>
      </CommonTemplate>
    </SuikaStoreProvider>
  );
}

export default SuikaPage;
