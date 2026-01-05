import { useCallback, useEffect, useState } from 'react';

export const useStarred = () => {
  const [starredCodes, setStarredCodes] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('starred');
    if (saved) {
      try {
        setStarredCodes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse starred codes', e);
      }
    }
  }, []);

  const toggleStar = useCallback((code: string) => {
    setStarredCodes((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      localStorage.setItem('starred', JSON.stringify(next));
      return next;
    });
  }, []);

  const isStarred = useCallback(
    (code: string) => {
      return starredCodes.includes(code);
    },
    [starredCodes],
  );

  return { starredCodes, toggleStar, isStarred };
};
