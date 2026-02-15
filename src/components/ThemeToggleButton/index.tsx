import { useEffect, useState, FC } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { Button } from '../Button';
import { useTheme } from './ThemeProvider';
import { MoonIcon, SunIcon } from './styled';

export const ThemeToggleButton: FC = () => {
  const { mode, toggleTheme } = useTheme();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const isDark = mode === 'dark';

  return (
    <Button
      variant="ghost"
      shape="pill"
      onClick={toggleTheme}
      style={{
        width: '48px',
        height: '48px',
        padding: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <SunIcon isVisible={!isDark} isRaising={!isDark} disableAnimation={isFirstRender}>
        <HiSun />
      </SunIcon>
      <MoonIcon isVisible={isDark} isRaising={isDark} disableAnimation={isFirstRender}>
        <HiMoon />
      </MoonIcon>
    </Button>
  );
};
