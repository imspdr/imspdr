import React, { createContext, useContext, useMemo } from "react";
import UnionStore from "./UnionStore";

const UnionContext = createContext<UnionStore | null>(null);

export const UnionStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new UnionStore();
  }, []);

  return <UnionContext.Provider value={store}> {children} </UnionContext.Provider>;
};

export const useUnionStore = () => {
  const context = useContext(UnionContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
