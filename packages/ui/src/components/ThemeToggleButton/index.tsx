import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { useTheme } from './ThemeProvider';
import { Container, MoonIcon, SunIcon } from './styled';

export const ThemeToggleButton: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const isDark = mode === 'dark';

  return (
    <Container onClick={toggleTheme}>
      <SunIcon isVisible={!isDark} isRaising={!isDark} disableAnimation={isFirstRender}>
        <HiSun />
      </SunIcon>
      <MoonIcon isVisible={isDark} isRaising={isDark} disableAnimation={isFirstRender}>
        <HiMoon />
      </MoonIcon>
    </Container>
  );
};
