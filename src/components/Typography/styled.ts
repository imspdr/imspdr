import styled from '@emotion/styled';

export type TypographyVariant = 'title' | 'body' | 'caption';
export type TypographyLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface StyledTextProps {
  variant: TypographyVariant;
  level: TypographyLevel;
  colorToken?: string; // e.g., 'primary.1', 'content.2', 'danger.1'
}

const fontFamilies = {
  title:
    "'Nanum Gothic', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans KR', sans-serif",
  body: "'Nanum Gothic', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans KR', sans-serif",
  caption: "'Inter', sans-serif",
};

const fontSizes = {
  title: {
    1: '40px',
    2: '32px',
    3: '28px',
    4: '24px',
    5: '20px',
    6: '18px',
  },
  body: {
    1: '16px',
    2: '14px',
    3: '13px',
    4: '13px',
    5: '13px',
    6: '13px',
  },
  caption: {
    1: '12px',
    2: '11px',
    3: '11px',
    4: '11px',
    5: '11px',
    6: '11px',
  },
};

const fontWeights = {
  title: 700,
  body: 400,
  caption: 400,
};

const getLineHeight = (variant: TypographyVariant) => {
  switch (variant) {
    case 'title': return 1.3;
    case 'body': return 1.6;
    case 'caption': return 1.4;
    default: return 1.5;
  }
};

const getColor = (token?: string) => {
  if (!token) return 'var(--imspdr-foreground-1)';

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

export const StyledText = styled.span<StyledTextProps>`
  font-family: ${({ variant }) => fontFamilies[variant]};
  font-size: ${({ variant, level }) => fontSizes[variant][level]};
  font-weight: ${({ variant, level }) => (variant === 'title' && level > 3 ? 600 : fontWeights[variant])};
  color: ${({ colorToken }) => getColor(colorToken)};
  margin: 0;
  line-height: ${({ variant }) => getLineHeight(variant)};

  ${({ variant }) =>
    variant === 'caption' &&
    `
    letter-spacing: 0.02em;
  `}
`;
