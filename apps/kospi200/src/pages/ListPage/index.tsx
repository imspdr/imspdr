import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@imspdr/ui';
import { StockTable } from '../../components/StockTable';
import { useDisplayStocks } from '../../hooks/useDisplayStocks';
import { useStocks } from '../../hooks/useKospiData';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { useStarred } from '../../hooks/useStarred';
import * as S from './styled';

const ListPage = () => {
  const navigate = useNavigate();
  const { data: stocks, isLoading } = useStocks();
  const { recentCodes } = useRecentlyViewed();
  const { starredCodes, toggleStar, isStarred } = useStarred();
  const { top10Stocks, buySignalStocks } = useDisplayStocks(stocks, recentCodes, starredCodes);

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <Typography variant="body" level={1}>
          로딩 중...
        </Typography>
      </S.LoadingContainer>
    );
  }

  return (
    <S.PageContainer>
      <Stack direction="column" gap="48px">
        {/* Top 10 Stocks Pretty Grid */}
        <section>
          <S.SectionTitle variant="title" level={2}>
            📈 상위 10개 변동 종목
          </S.SectionTitle>
          <S.TopStocksGrid>
            {top10Stocks.map((stock, index) => {
              const isRising = stock.today > stock.last;
              const change = stock.today - stock.last;
              const changePercent = (change / stock.last) * 100;

              return (
                <S.StockCard key={stock.code} onClick={() => handleStockSelect(stock.code)}>
                  <S.RankBadge rank={index + 1}>{index + 1}</S.RankBadge>
                  <Typography variant="title" level={3}>
                    {stock.name}
                  </Typography>
                  <S.PriceInfo>
                    <Typography variant="body" level={1} style={{ fontWeight: 600 }}>
                      {stock.today.toLocaleString()}원
                    </Typography>
                    <S.ChangeLabel isRising={isRising} variant="caption">
                      {isRising ? '▲' : '▼'} {Math.abs(change).toLocaleString()} (
                      {Math.abs(changePercent).toFixed(1)}%)
                    </S.ChangeLabel>
                  </S.PriceInfo>
                </S.StockCard>
              );
            })}
          </S.TopStocksGrid>
        </section>

        {/* Buy Signal Stocks Table */}
        <section>
          <S.SectionTitle variant="title" level={2}>
            🎯 매수 신호 종목
          </S.SectionTitle>
          <StockTable
            stocks={buySignalStocks}
            onStockClick={handleStockSelect}
            onToggleStar={toggleStar}
            isStarred={isStarred}
            maxHeight={buySignalStocks.length > 12 ? '600px' : undefined}
            emptyMessage="현재 매수 신호가 있는 종목이 없습니다."
          />
        </section>
      </Stack>
    </S.PageContainer>
  );
};

export default ListPage;
