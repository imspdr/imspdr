import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { ButtonVariant, StyledButton } from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ variant = 'box', children, ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
