import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ModalProvider, ThemeProvider, ToastProvider } from '@imspdr/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as S from './App.styled';
import Header from './components/Header';
import { Sidebar } from './components/Sidebar';
import { useDisplayStocks } from './hooks/useDisplayStocks';
import { useStocks } from './hooks/useKospiData';
import { useRecentlyViewed } from './hooks/useRecentlyViewed';
import { useStarred } from './hooks/useStarred';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

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
  const { starredCodes, toggleStar, isStarred } = useStarred();
  const { recentCodes } = useRecentlyViewed();
  const [isFolded, setIsFolded] = React.useState(false);

  const { recentlyViewedStocks, starredStocks, searchOptions } = useDisplayStocks(
    stocks,
    recentCodes,
    starredCodes,
  );

  const handleStockClick = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <S.LayoutContainer>
      <Header
        onHomeClick={() => navigate('/list')}
        searchOptions={searchOptions}
        onSearchSelect={(opt) => handleStockClick(opt.value)}
      />
      <S.MainContent isFolded={isFolded}>
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:code" element={<DetailPage />} />
          <Route path="/" element={<Navigate to="/list" replace />} />
        </Routes>
      </S.MainContent>
      <Sidebar
        starredStocks={starredStocks}
        recentlyViewedStocks={recentlyViewedStocks}
        onStockClick={handleStockClick}
        onToggleStar={toggleStar}
        isStarred={isStarred}
        isFolded={isFolded}
        onToggleFold={() => setIsFolded(!isFolded)}
      />
    </S.LayoutContainer>
  );
};

export default App;
