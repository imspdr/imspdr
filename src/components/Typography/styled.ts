import styled from '@emotion/styled';
import { getColor } from '../../utils/colors';

export type TypographyVariant = 'title' | 'body' | 'caption';
export type TypographyLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface StyledTextProps {
  variant: TypographyVariant;
  level: TypographyLevel;
  colorToken?: string; // e.g., 'primary.1', 'content.2', 'danger.1'
  bold?: boolean;
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

export const StyledText = styled.span<StyledTextProps>`
  font-family: ${({ variant }) => fontFamilies[variant]};
  font-size: ${({ variant, level }) => fontSizes[variant][level]};
  font-weight: ${({ variant, level, bold }) =>
    bold ? 700 : variant === 'title' && level > 3 ? 600 : fontWeights[variant]};
  color: ${({ colorToken }) => getColor(colorToken)};
  margin: 0;
  line-height: ${({ variant }) => getLineHeight(variant)};

  ${({ variant }) =>
    variant === 'caption' &&
    `
    letter-spacing: 0.02em;
  `}
`;
