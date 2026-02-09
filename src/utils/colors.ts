export const getColor = (token?: string, defaultColor = 'var(--imspdr-foreground-1)') => {
  if (!token) return defaultColor;

  // Handle CSS variables directly
  if (token.startsWith('var(')) return token;

  // If it's a dotted token like 'primary.1'
  if (token.includes('.')) {
    const [category, level] = token.split('.');
    return `var(--imspdr-${category.toLowerCase()}-${level})`;
  }

  // If it's something like 'primary1'
  if (/[a-zA-Z]+\d+/.test(token)) {
    const category = token.replace(/\d+/, '');
    const level = token.replace(/[a-zA-Z]+/, '');
    return `var(--imspdr-${category.toLowerCase()}-${level})`;
  }

  return `var(--imspdr-${token.toLowerCase()})`;
};
