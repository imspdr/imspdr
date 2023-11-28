import { MainStoreProvider } from "./store/MainStoreProvider";
import MainPageTemplate from "./components/MainTemplate";
import MobileTemplate from "./components/MobileTemplate";
import { isMobile } from "react-device-detect";

export default function MainPage() {
  return (
    <MainStoreProvider>
      <>{isMobile ? <MobileTemplate /> : <MainPageTemplate />}</>
    </MainStoreProvider>
  );
}
