import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { getColor } from '../../utils/colors';

export type ButtonVariant = 'contained' | 'outlined' | 'ghost' | 'text';
export type ButtonShape = 'square' | 'rounded' | 'pill';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface StyledButtonProps {
  variant: ButtonVariant;
  shape: ButtonShape;
  size: ButtonSize;
  colorToken: string;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const sizeStyles = {
  xs: css`
    padding: 4px 6px;
    font-size: 12px;
    gap: 4px;
    height: 24px;
  `,
  sm: css`
    padding: 6px 9px;
    font-size: 13px;
    gap: 6px;
    height: 32px;
  `,
  md: css`
    padding: 8px 12px;
    font-size: 14px;
    gap: 8px;
    height: 40px;
  `,
  lg: css`
    padding: 10px 15px;
    font-size: 16px;
    gap: 10px;
    height: 48px;
  `,
  xl: css`
    padding: 12px 18px;
    font-size: 18px;
    gap: 12px;
    height: 56px;
  `,
};

const shapeStyles = {
  square: css`border-radius: 0;`,
  rounded: css`border-radius: 8px;`,
  pill: css`border-radius: 9999px;`,
};

export const LoadingSpinner = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  white-space: nowrap;
  user-select: none;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ isLoading }) => (isLoading ? 0.8 : 1)};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};

  ${({ size }) => sizeStyles[size]}
  ${({ shape }) => shapeStyles[shape]}

  ${({ variant, colorToken }) => {
    const color = getColor(colorToken, 'var(--imspdr-primary-1)');

    switch (variant) {
      case 'outlined':
        return css`
          background: transparent;
          border-color: ${color};
          color: ${color};
          @media (hover: hover) {
            &:hover {
              background: ${color}15; /* 15 is approx 8% opacity in hex */
            }
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          border-color: transparent;
          color: ${color};
          @media (hover: hover) {
            &:hover {
              background: ${color}15;
            }
          }
        `;
      case 'text':
        return css`
          background: transparent;
          border-color: transparent;
          color: ${color};
          padding-left: 4px;
          padding-right: 4px;
          height: auto;
          @media (hover: hover) {
            &:hover {
              text-decoration: underline;
            }
          }
        `;
      case 'contained':
      default:
        return css`
          background: ${color};
          border-color: ${color};
          color: var(--imspdr-white);
          @media (hover: hover) {
            &:hover {
              filter: brightness(0.9);
            }
          }
        `;
    }
  }}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--imspdr-background-3);
    border-color: var(--imspdr-background-3);
    color: var(--imspdr-foreground-3);
    opacity: 0.6;
    transform: none;
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
