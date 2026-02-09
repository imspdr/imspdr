import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import {
  ButtonVariant,
  ButtonShape,
  ButtonSize,
  StyledButton,
  LoadingSpinner,
  IconWrapper,
} from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각적 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼의 형태 */
  shape?: ButtonShape;
  /** 버튼의 크기 */
  size?: ButtonSize;
  /** 테마 토큰 기반 색상 (예: 'primary.1', 'danger.1') */
  color?: string;
  /** 너비를 100%로 설정 */
  fullWidth?: boolean;
  /** 로딩 상태 표시 */
  isLoading?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: ReactNode;
  /** 버튼 내용 */
  children?: ReactNode;
}

/**
 * 고도화된 디자인 시스템 버튼 컴포넌트입니다.
 * 다양한 변형, 크기, 형태 및 상태(로딩, 아이콘)를 지원합니다.
 */
export const Button: FC<ButtonProps> = ({
  variant = 'contained',
  shape = 'rounded',
  size = 'md',
  color = 'primary.1',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      shape={shape}
      size={size}
      colorToken={color}
      fullWidth={fullWidth}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      {children}
      {!isLoading && rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledButton>
  );
};
