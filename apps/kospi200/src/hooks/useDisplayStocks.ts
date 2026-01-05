import { useMemo } from 'react';
import { Stock } from './useKospiData';

interface ProcessedStock extends Stock {
  changePercent: number;
  absChangePercent: number;
}

export const useDisplayStocks = (
  stocks: Stock[] | undefined,
  recentCodes: string[],
  starredCodes: string[] = [],
) => {
  const processedStocks = useMemo<ProcessedStock[]>(() => {
    if (!stocks) return [];
    return stocks.map((s) => ({
      ...s,
      changePercent: ((s.today - s.last) / s.last) * 100,
      absChangePercent: Math.abs((s.today - s.last) / s.last) * 100,
    }));
  }, [stocks]);

  const top10Codes = useMemo(() => {
    const top10 = [...processedStocks]
      .sort((a, b) => b.absChangePercent - a.absChangePercent) // Sort by absolute percentage change (gap)
      .slice(0, 10)
      .map((s) => s.code);
    return new Set(top10);
  }, [processedStocks]);

  const displayStocks = useMemo(() => {
    const recentStocks = processedStocks.filter((s) => recentCodes.includes(s.code));
    const top10Stocks = processedStocks.filter(
      (s) => top10Codes.has(s.code) && !recentCodes.includes(s.code),
    );
    return [...recentStocks, ...top10Stocks];
  }, [processedStocks, recentCodes, top10Codes]);

  const searchOptions = useMemo(() => {
    return processedStocks.map((s) => ({
      label: s.name,
      subLabel: s.code,
      value: s.code,
    }));
  }, [processedStocks]);

  const buySignalStocks = useMemo(() => {
    return processedStocks.filter((s) => s.to_buy.length > 0);
  }, [processedStocks]);

  const recentlyViewedStocks = useMemo(() => {
    // Preserve order of recentCodes
    return recentCodes
      .map((code) => processedStocks.find((s) => s.code === code))
      .filter((s): s is ProcessedStock => s !== undefined);
  }, [processedStocks, recentCodes]);

  const starredStocks = useMemo(() => {
    return starredCodes
      .map((code) => processedStocks.find((s) => s.code === code))
      .filter((s): s is ProcessedStock => s !== undefined);
  }, [processedStocks, starredCodes]);

  return {
    processedStocks,
    top10Codes,
    top10Stocks: [...processedStocks].filter((s) => top10Codes.has(s.code)),
    recentlyViewedStocks,
    starredStocks,
    displayStocks,
    buySignalStocks,
    searchOptions,
  };
};
