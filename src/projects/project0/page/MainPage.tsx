import { MainStoreProvider } from "../store/MainStoreProvider";
import MainPageTemplate from "../template/MainTemplate";

export default function MainPage() {
  return (
    <MainStoreProvider>
      <MainPageTemplate />
    </MainStoreProvider>
  );
}
