import React, { createContext, useContext, useMemo } from "react";
import CellStore from "./CellStore";

const CellContext = createContext<CellStore | null>(null);

export const CellStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new CellStore();
  }, []);

  return <CellContext.Provider value={store}> {children} </CellContext.Provider>;
};

export const useCellStore = () => {
  const context = useContext(CellContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
