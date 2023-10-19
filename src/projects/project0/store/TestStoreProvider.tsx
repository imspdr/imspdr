import React, { createContext, useContext, useMemo } from "react";
import TestStore from "./TestStore";

const TestContext = createContext<TestStore | null>(null);

export const TestStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new TestStore();
  }, []);

  return <TestContext.Provider value={store}> {children} </TestContext.Provider>;
};

export const useTestStore = () => {
  const context = useContext(TestContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
