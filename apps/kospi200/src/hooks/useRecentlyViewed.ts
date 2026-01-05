import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'kospi200_recently_viewed';
const MAX_RECENT = 10;

export const useRecentlyViewed = () => {
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

  return {
    recentCodes,
    addRecentView,
  };
};
