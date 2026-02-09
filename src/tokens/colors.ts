export const lightPalette = {
  background: {
    1: '#ffffff',
    2: '#f8fafc',
    3: '#f1f5f9',
  },
  foreground: {
    1: '#0f172a', // Slate 900
    2: '#334155', // Slate 700
    3: '#64748b', // Slate 500
  },
  primary: {
    1: '#14b8a6', // Teal 500
    2: '#0d9488', // Teal 600
    3: '#0f766e', // Teal 700
  },
  danger: {
    1: '#ef4444', // Red 500
    2: '#dc2626', // Red 600
    3: '#b91c1c', // Red 700
  },
  warning: {
    1: '#f59e0b', // Amber 500
    2: '#d97706', // Amber 600
    3: '#b45309', // Amber 700
  },
  success: {
    1: '#10b981', // Emerald 500
    2: '#059669', // Emerald 600
    3: '#047857', // Emerald 700
  },
  info: {
    1: '#3b82f6', // Blue 500
    2: '#2563eb', // Blue 600
    3: '#1d4ed8', // Blue 700
  },
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  white: '#ffffff',
};

export const darkPalette = {
  background: {
    1: '#0f172a', // Slate 950
    2: '#1e293b', // Slate 900
    3: '#334155', // Slate 800
  },
  foreground: {
    1: '#f8fafc', // Slate 50
    2: '#e2e8f0', // Slate 200
    3: '#94a3b8', // Slate 400
  },
  primary: {
    1: '#2dd4bf', // Teal 400
    2: '#14b8a6', // Teal 500
    3: '#0d9488', // Teal 600
  },
  danger: {
    1: '#f87171', // Red 400
    2: '#ef4444', // Red 500
    3: '#dc2626', // Red 600
  },
  warning: {
    1: '#fbbf24', // Amber 400
    2: '#f59e0b', // Amber 500
    3: '#d97706', // Amber 600
  },
  success: {
    1: '#34d399', // Emerald 400
    2: '#10b981', // Emerald 500
    3: '#059669', // Emerald 600
  },
  info: {
    1: '#60a5fa', // Blue 400
    2: '#3b82f6', // Blue 500
    3: '#2563eb', // Blue 600
  },
  overlay: 'rgba(0, 0, 0, 0.65)',
  shadow: 'rgba(0, 0, 0, 0.3)',
  white: '#ffffff',
};

export type ColorTokens = typeof lightPalette;
