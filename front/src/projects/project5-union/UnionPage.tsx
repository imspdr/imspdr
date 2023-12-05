import CommonTemplate from "@src/common/CommonTemplate";
import { UnionStoreProvider } from "./store/UnionStoreProvider";
import UnionTemplate from "./components/UnionTemplate";
import { useEffect, useState } from "react";

function UnionPage() {
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
    <UnionStoreProvider>
      <CommonTemplate title="유니온 배치기" width={windowWidth}>
        <UnionTemplate width={windowWidth} />
      </CommonTemplate>
    </UnionStoreProvider>
  );
}

export default UnionPage;
