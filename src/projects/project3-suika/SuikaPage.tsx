import CommonTemplate from "@src/common/CommonTemplate";
import { SuikaStoreProvider } from "./store/SuikaStoreProvider";
import SuikaTemplate from "./components/SuikaTemplate";
import { useEffect, useState } from "react";

function SuikaPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleSizeChange = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);
  return (
    <SuikaStoreProvider>
      <SuikaTemplate width={windowWidth} />
    </SuikaStoreProvider>
  );
}

export default SuikaPage;
