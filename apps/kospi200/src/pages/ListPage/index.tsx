import { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { StockCard } from '../../components/StockCard';
import { useDisplayStocks } from '../../hooks/useDisplayStocks';
import { useStocks } from '../../hooks/useKospiData';
import {
  FlexColumn,
  CompactInfo,
  CompactStockItem,
  CompactStockList,
  LoadingContainer,
  PageContainer,
  RankNumber,
  SectionTitle,
  StockGrid,
} from './styled';
import { ChangeLabel } from '../../components/StockCard/styled';

const ListPage: FC = () => {
  const navigate = useNavigate();
  const { data: stocks, isLoading } = useStocks();
  const { top10Codes, buySignalStocks } = useDisplayStocks(stocks ?? []);

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Typography variant="body" level={1}>
          로딩 중...
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <div>
        <SectionTitle variant="title" level={2}>
          상위 10개 변동 종목
        </SectionTitle>
        <CompactStockList>
          {top10Codes.map((code, index) => {
            const stock = stocks?.find((s) => s.code === code);
            if (!stock) return null;

            const isRising = stock.today > stock.last;
            const change = stock.today - stock.last;
            const changePercent = (change / stock.last) * 100;

            return (
              <CompactStockItem key={stock.code} onClick={() => handleStockSelect(stock.code)}>
                <RankNumber rank={index + 1}>{index + 1}</RankNumber>
                <CompactInfo>
                  <Typography variant="body" level={1} style={{ fontWeight: 600 }}>
                    {stock.name}
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Typography variant="body" level={2} style={{ fontWeight: 500 }}>
                      {stock.today.toLocaleString()}원
                    </Typography>
                    <ChangeLabel
                      isRising={isRising}
                      variant="caption"
                      style={{ minWidth: '70px', justifyContent: 'flex-end' }}
                    >
                      {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                    </ChangeLabel>
                  </div>
                </CompactInfo>
              </CompactStockItem>
            );
          })}
        </CompactStockList>
      </div>
      {/* Buy Signal Stocks Cards */}
      <FlexColumn>
        <SectionTitle variant="title" level={2}>
          매수 신호 종목
        </SectionTitle>
        {buySignalStocks.length === 0 ? (
          <LoadingContainer>
            <Typography variant="body" level={2} style={{ color: '#666' }}>
              현재 매수 신호가 있는 종목이 없습니다.
            </Typography>
          </LoadingContainer>
        ) : (
          <StockGrid>
            {buySignalStocks.map((stock) => (
              <StockCard
                key={stock.code}
                name={stock.name}
                code={stock.code}
                today={stock.today}
                last={stock.last}
                signals={stock.toBuy}
                onClick={() => handleStockSelect(stock.code)}
              />
            ))}
          </StockGrid>
        )}
      </FlexColumn>
    </PageContainer>
  );
};

export default ListPage;
