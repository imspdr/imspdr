import { useMemo } from 'react';
import { Stock } from './useKospiData';

export const useDisplayStocks = (stocks: Stock[]) => {
  const top10Codes = useMemo(() => {
    const top10 = [...stocks]
      .sort((a, b) => b.absChangePercent - a.absChangePercent) // Sort by absolute percentage change (gap)
      .slice(0, 10)
      .map((s) => s.code);
    return new Set(top10);
  }, [stocks]);

  const searchOptions = useMemo(() => {
    return stocks.map((s) => ({
      label: s.name,
      subLabel: s.code,
      value: s.code,
    }));
  }, [stocks]);

  const buySignalStocks = useMemo(() => {
    return stocks.filter((s) => s.toBuy?.length > 0);
  }, [stocks]);

  return {
    top10Codes,
    top10Stocks: stocks.filter((s) => top10Codes.has(s.code)),
    buySignalStocks,
    searchOptions,
  };
};
