import { ReactNode, createContext, useCallback, useContext, useState, FC } from 'react';
import { ToastContainer, ToastItem } from './index';

export interface Toast {
  id: number;
  message: string;
  isRemoving?: boolean;
}

export interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    // Trigger fade out
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isRemoving: true } : t)));
    }, 2700);

    // Remove toast
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} isRemoving={toast.isRemoving}>
            {toast.message}
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
