import { FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@imspdr/ui';
import { StockCard } from '../../components/StockCard';
import { useDisplayStocks } from '../../hooks/useDisplayStocks';
import { useStocks } from '../../hooks/useKospiData';
import { LoadingContainer, PageContainer, SectionTitle, TopStocksGrid } from './styled';

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
      <Stack direction="column" gap="48px">
        {/* Top 10 Stocks Pretty Grid */}
        <section>
          <SectionTitle variant="title" level={2}>
            상위 10개 변동 종목
          </SectionTitle>
          <TopStocksGrid>
            {top10Codes.map((code, index) => {
              const stock = stocks?.find((s) => s.code === code);
              if (!stock) return null;

              return (
                <StockCard
                  key={stock.code}
                  name={stock.name}
                  code={stock.code}
                  today={stock.today}
                  last={stock.last}
                  rank={index + 1}
                  onClick={() => handleStockSelect(stock.code)}
                />
              );
            })}
          </TopStocksGrid>
        </section>

        {/* Buy Signal Stocks Cards */}
        <section>
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
            <TopStocksGrid>
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
            </TopStocksGrid>
          )}
        </section>
      </Stack>
    </PageContainer>
  );
};

export default ListPage;
