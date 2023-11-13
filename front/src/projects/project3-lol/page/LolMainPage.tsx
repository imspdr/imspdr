import { Route, Routes, useNavigate } from "react-router-dom";
import CommonTemplate from "@src/common/CommonTemplate";
import { LolMainStoreProvider } from "../store/LolMainStoreProvider";
import LolSearchPage from "./LolSearchPage";

function LolMainPage() {
  return (
    <LolMainStoreProvider>
      <CommonTemplate title="LOL 전적 검색">
        <Routes>
          <Route path="/" element={<LolSearchPage />} />
          <Route path="/ingame" element={<></>} />
          <Route path="/lastgame" element={<></>} />
        </Routes>
      </CommonTemplate>
    </LolMainStoreProvider>
  );
}

export default LolMainPage;
