import { ReactNode, createContext, useCallback, useContext, useEffect, useState, FC } from 'react';
import {
  CloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Overlay,
} from './styled';

interface ModalInstance {
  id: string;
  content: ReactNode;
  options?: ModalOptions;
}

interface ModalOptions {
  title?: string;
  footer?: ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
}

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => string;
  closeModal: (id?: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<ModalInstance[]>([]);

  const openModal = useCallback((content: ReactNode, options?: ModalOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    setModalStack((prev) => [...prev, { id, content, options }]);
    return id;
  }, []);

  const closeModal = useCallback((id?: string) => {
    setModalStack((prev) => {
      if (prev.length === 0) return prev;

      const targetId = id || prev[prev.length - 1].id;
      const targetModal = prev.find((m) => m.id === targetId);

      if (targetModal?.options?.onClose) {
        targetModal.options.onClose();
      }

      return prev.filter((m) => m.id !== targetId);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalStack.length > 0) {
        closeModal();
      }
    };

    if (modalStack.length > 0) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalStack.length, closeModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalStack.map((modal, index) => (
        <Overlay
          key={modal.id}
          zIndex={1000 + index}
          onClick={(e) => {
            if (e.target === e.currentTarget && modal.options?.closeOnOverlayClick !== false) {
              closeModal(modal.id);
            }
          }}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{modal.options?.title || '알림'}</ModalTitle>
              <CloseButton onClick={() => closeModal(modal.id)}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>{modal.content}</ModalBody>
            {modal.options?.footer && <ModalFooter>{modal.options.footer}</ModalFooter>}
          </ModalContent>
        </Overlay>
      ))}
    </ModalContext.Provider>
  );
};
