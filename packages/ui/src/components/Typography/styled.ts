import styled from '@emotion/styled';

export type TypographyVariant = 'title' | 'body' | 'caption';
export type TypographyLevel = 1 | 2 | 3;

interface StyledTextProps {
  variant: TypographyVariant;
  level: TypographyLevel;
}

const fontFamilies = {
  title:
    "'NanumSquareNeo', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans KR', sans-serif",
  body: "'NanumSquareNeo', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans KR', sans-serif",
  caption: "'Inter', sans-serif",
};

const fontSizes = {
  title: {
    1: '32px',
    2: '24px',
    3: '20px',
  },
  body: {
    1: '16px',
    2: '14px',
    3: '12px',
  },
  caption: {
    1: '12px',
    2: '12px', // Level not strictly used for caption but kept for type safety
    3: '12px',
  },
};

const fontWeights = {
  title: 700,
  body: 400,
  caption: 400,
};

export const StyledText = styled.span<StyledTextProps>`
  font-family: ${({ variant }) => fontFamilies[variant]};
  font-size: ${({ variant, level }) => fontSizes[variant][level]};
  font-weight: ${({ variant }) => fontWeights[variant]};
  color: var(--imspdr-foreground-fg1);
  margin: 0;
  line-height: 1.5;

  ${({ variant }) =>
    variant === 'caption' &&
    `
    color: var(--imspdr-foreground-fg3);
    letter-spacing: 0.02em;
  `}
`;
