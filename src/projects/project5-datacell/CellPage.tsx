import { CellStoreProvider } from "./store/CellStoreProvider";
import CellTemplate from "./components/CellTemplate";
import { useEffect, useState } from "react";

function CellPage() {
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
    <CellStoreProvider>
      <CellTemplate />
    </CellStoreProvider>
  );
}

export default CellPage;
