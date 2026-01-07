import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideIn = keyframes`
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 2000;
  pointer-events: none;
`;

export const ToastItem = styled.div<{ isRemoving?: boolean }>`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${({ isRemoving }) => (isRemoving ? fadeOut : slideIn)} 0.3s ease-out forwards;
  pointer-events: auto;
  white-space: nowrap;
  
  /* Contrast styling */
  background: var(--imspdr-foreground-fg1);
  color: var(--imspdr-background-bg1);
`;
