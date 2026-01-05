import React, { useState } from 'react';
import { Button, ModalProvider, ThemeProvider, ToastProvider } from '@imspdr/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header';

const queryClient = new QueryClient();

const App = () => {
  const [selectedStockCode, setSelectedStockCode] = useState<string | null>(null);

  const handleNavigateHome = () => {
    setSelectedStockCode(null);
  };

  const handleStockSelect = (code: string) => {
    setSelectedStockCode(code);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
            <Header onHomeClick={handleNavigateHome} />
            <main
              style={{
                paddingTop: '60px',
                minHeight: '100vh',
                backgroundColor: 'var(--imspdr-background-bg2)',
              }}
            >
              {selectedStockCode ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h2>Detail Page Placeholder</h2>
                  <p>Selected Stock Code: {selectedStockCode}</p>
                  <Button onClick={() => setSelectedStockCode(null)}>Back to Dashboard</Button>
                </div>
              ) : (
                <Dashboard onStockSelect={handleStockSelect} />
              )}
            </main>
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
