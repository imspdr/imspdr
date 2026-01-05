import React from 'react';
import { StyledText, TypographyLevel, TypographyVariant } from './styled';

export interface TypographyProps {
  variant?: TypographyVariant;
  level?: TypographyLevel;
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  level = 1,
  children,
  as,
  className,
  style,
}) => {
  // Determine default element based on variant/level
  const defaultElement = () => {
    if (variant === 'title') {
      if (level === 1) return 'h1';
      if (level === 2) return 'h2';
      return 'h3';
    }
    if (variant === 'body') return 'p';
    return 'span';
  };

  const Component = as || defaultElement();

  return (
    <StyledText as={Component} variant={variant} level={level} className={className} style={style}>
      {children}
    </StyledText>
  );
};
