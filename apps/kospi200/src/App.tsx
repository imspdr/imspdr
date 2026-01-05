import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ModalProvider, ThemeProvider, ToastProvider } from '@imspdr/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useDisplayStocks } from './hooks/useDisplayStocks';
import { useStocks } from './hooks/useKospiData';
import { DetailPage } from './pages/DetailPage';
import ListPage from './pages/ListPage';
import { LayoutContainer, MainContent } from './styled';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppLayout = () => {
  const navigate = useNavigate();
  const { data: stocks } = useStocks();
  const [isFolded, setIsFolded] = React.useState(false);

  const { searchOptions } = useDisplayStocks(stocks ?? []);

  const handleStockClick = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <LayoutContainer>
      <Header
        onHomeClick={() => navigate('/list')}
        searchOptions={searchOptions}
        onSearchSelect={(opt) => handleStockClick(opt.value)}
      />
      <MainContent isFolded={isFolded}>
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:code" element={<DetailPage />} />
          <Route path="/" element={<Navigate to="/list" replace />} />
        </Routes>
      </MainContent>
      <Sidebar isFolded={isFolded} onToggleFold={() => setIsFolded(!isFolded)} />
    </LayoutContainer>
  );
};

export default App;
