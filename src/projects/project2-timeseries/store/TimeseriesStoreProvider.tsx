import React, { createContext, useContext, useMemo } from "react";
import TimeseriesStore from "./TimeseriesStore";

const TimeseriesContext = createContext<TimeseriesStore | null>(null);

export const TimeseriesStoreProvider = ({ children }: { children: React.ReactElement }) => {
  const store = useMemo(() => {
    return new TimeseriesStore();
  }, []);

  return <TimeseriesContext.Provider value={store}> {children} </TimeseriesContext.Provider>;
};

export const useTimeseriesStore = () => {
  const context = useContext(TimeseriesContext);
  if (context === null) {
    throw Error("provider is null");
  }
  return context;
};
