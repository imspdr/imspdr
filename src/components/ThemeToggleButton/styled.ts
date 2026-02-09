import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const raise = keyframes`
  from {
    opacity: 0;
    top: 25px;
    right: 22px;
    transform: rotate(-45deg);
  }
  to {
    opacity: 1;
    top: 12px;
    right: 12px;
    transform: rotate(0deg);
  }
`;

const down = keyframes`
  from {
    opacity: 1;
    top: 12px;
    right: 12px;
    transform: rotate(0deg);
  }
  to {
    opacity: 0;
    top: 25px;
    right: 2px;
    transform: rotate(45deg);
  }
`;

export const Container = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--imspdr-background-2);
  }
`;

interface IconProps {
  isVisible: boolean;
  isRaising: boolean;
  disableAnimation?: boolean;
}

const IconBase = styled.div<IconProps>`
  position: absolute;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  top: ${(props) => (props.isVisible ? '12px' : '25px')};
  right: ${(props) => (props.isVisible ? '12px' : props.isRaising ? '22px' : '2px')};
  animation: ${(props) => (props.disableAnimation ? 'none' : props.isRaising ? raise : down)} 0.5s
    ease-out;
  color: var(--imspdr-foreground-1);

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SunIcon = styled(IconBase)``;
export const MoonIcon = styled(IconBase)``;
