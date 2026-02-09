import { FC, ReactNode, ElementType, CSSProperties } from 'react';
import { StyledText, TypographyLevel, TypographyVariant } from './styled';

export interface TypographyProps {
  /** The visual style variant */
  variant?: TypographyVariant;
  /** The importance level (higher is larger/more important) */
  level?: TypographyLevel;
  /** Color token (e.g., 'primary.1', 'content.2', 'danger.1') */
  color?: string;
  /** The text content or child elements */
  children: ReactNode;
  /** HTML element to render as */
  as?: ElementType;
  /** Custom class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Advanced Typography component for consistent text styling.
 * Supports semantic variants, multiple levels, and color tokens.
 */
export const Typography: FC<TypographyProps> = ({
  variant = 'body',
  level = 1,
  color,
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
      if (level === 3) return 'h3';
      if (level === 4) return 'h4';
      if (level === 5) return 'h5';
      return 'h6';
    }
    if (variant === 'body') return 'p';
    return 'span';
  };

  const Component = as || defaultElement();

  return (
    <StyledText
      as={Component}
      variant={variant}
      level={level}
      colorToken={color}
      className={className}
      style={style}
    >
      {children}
    </StyledText>
  );
};
