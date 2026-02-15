import styled from '@emotion/styled';

export const Overlay = styled.div<{ zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--imspdr-overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ zIndex }) => zIndex || 1000};
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: var(--imspdr-background-1);
  color: var(--imspdr-foreground-1);
  border-radius: 12px;
  box-shadow:
    0 20px 25px -5px var(--imspdr-shadow),
    0 8px 10px -6px var(--imspdr-shadow);
  max-width: 500px;
  width: 90%;
  position: relative;
  border: 1px solid var(--imspdr-background-3);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--imspdr-background-3);
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--imspdr-foreground-1);
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid var(--imspdr-background-3);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: var(--imspdr-background-2);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--imspdr-foreground-2);
  padding: 4px;
  margin-right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;

  @media (hover: hover) {
    &:hover {
      color: var(--imspdr-foreground-1);
      background-color: var(--imspdr-background-2);
    }
  }
`;
