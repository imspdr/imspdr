import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const [isPc, setIsPc] = useState(window.innerWidth > 767);

  useEffect(() => {
    const handleResize = () => {
      setIsPc(window.innerWidth > 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isPc };
};
