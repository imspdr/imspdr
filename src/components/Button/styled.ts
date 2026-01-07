import styled from '@emotion/styled';

export type ButtonVariant = 'box' | 'outlined';

interface StyledButtonProps {
  variant?: ButtonVariant;
}

export const StyledButton = styled.button<StyledButtonProps>`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({ variant }) =>
    variant === 'outlined'
      ? `
    background: transparent;
    border: 1px solid var(--imspdr-mint-mint1);
    color: var(--imspdr-mint-mint1);
    &:hover {
      background: var(--imspdr-mint-mint1_10);
    }
  `
      : `
    background: var(--imspdr-mint-mint1);
    border: 1px solid var(--imspdr-mint-mint1);
    color: var(--imspdr-white);
    &:hover {
      background: var(--imspdr-mint-mint2);
      border-color: var(--imspdr-mint-mint2);
    }
  `}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--imspdr-foreground-fg3);
    border-color: var(--imspdr-foreground-fg3);
    color: var(--imspdr-background-bg2);
    opacity: 0.6;

    ${({ variant }) =>
      variant === 'outlined' &&
      `
      background: transparent;
      color: var(--imspdr-foreground-fg3);
    `}
  }
`;
