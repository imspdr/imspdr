import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'kospi200_recently_viewed';
const MAX_RECENT = 10;

export const useRecentlyViewed = <T extends { code: string }>(stocks?: T[]) => {
  const [recentCodes, setRecentCodes] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentCodes));
  }, [recentCodes]);

  const addRecentView = useCallback((code: string) => {
    setRecentCodes((prev) => {
      // Remove if already exists
      const filtered = prev.filter((c) => c !== code);
      // Add to front and limit to MAX_RECENT
      return [code, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const recentlyViewedStocks = useMemo(() => {
    if (!stocks) return [];
    return recentCodes
      .map((code) => stocks.find((s) => s.code === code))
      .filter((s): s is T => s !== undefined);
  }, [stocks, recentCodes]);

  return {
    recentCodes,
    recentlyViewedStocks,
    addRecentView,
  };
};
