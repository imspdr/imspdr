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
    border: 1px solid var(--imspdr-primary-1);
    color: var(--imspdr-primary-1);
    &:hover {
      background: var(--imspdr-primary-1_10);
    }
  `
      : `
    background: var(--imspdr-primary-1);
    border: 1px solid var(--imspdr-primary-1);
    color: var(--imspdr-white);
    &:hover {
      background: var(--imspdr-primary-2);
      border-color: var(--imspdr-primary-2);
    }
  `}

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--imspdr-foreground-3);
    border-color: var(--imspdr-foreground-3);
    color: var(--imspdr-background-2);
    opacity: 0.6;

    ${({ variant }) =>
      variant === 'outlined' &&
      `
      background: transparent;
      color: var(--imspdr-foreground-3);
    `}
  }
`;
