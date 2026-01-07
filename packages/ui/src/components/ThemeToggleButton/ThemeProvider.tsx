import { createContext, useCallback, useContext, useMemo, useState, FC, ReactNode } from 'react';
import { Global, css } from '@emotion/react';
import { ColorTokens, darkPalette, lightPalette } from '../../tokens/colors';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  tokens: ColorTokens;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const generateVars = (tokens: any, prefix = ''): string => {
  return Object.entries(tokens).reduce((acc: string, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      return acc + generateVars(value, `${prefix}${key.toLowerCase()}-`);
    }
    return acc + `--imspdr-${prefix}${key.toLowerCase()}: ${value};\n`;
  }, '');
};

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const tokens = useMemo(() => (mode === 'light' ? lightPalette : darkPalette), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, tokens }}>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap');
          @import url('https://cdn.jsdelivr.net/gh/sun-typeface/nanum-square-neo@master/nanum-square-neo.css');

          :root {
            ${generateVars(tokens)}
          }

          body {
            background-color: var(--imspdr-background-bg1);
            color: var(--imspdr-foreground-fg1);
            margin: 0;
            transition:
              background-color 0.3s,
              color 0.3s;
          }
        `}
      />
      {children}
    </ThemeContext.Provider>
  );
};
