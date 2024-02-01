import CommonTemplate from "@src/common/CommonTemplate";
import { PokedamStoreProvider } from "./store/PokedamStoreProvider";
import PokedamTemplate from "./components/PokedamTemplate";
import { useEffect, useState } from "react";

function PokedamPage() {
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
    <PokedamStoreProvider>
      <PokedamTemplate />
    </PokedamStoreProvider>
  );
}

export default PokedamPage;
