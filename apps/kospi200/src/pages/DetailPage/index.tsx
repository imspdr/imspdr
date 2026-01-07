import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { StockChart } from '../../components/StockChart';
import { useStockDetail } from '../../hooks/useKospiData';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { ChartSection, Container, Header, NewsSection, StyledCard } from './styled';

export const DetailPage: FC = () => {
  const { code } = useParams<{ code: string }>();
  const { data: stock, isLoading } = useStockDetail(code || null);
  const { addRecentView } = useRecentlyViewed([]);

  useEffect(() => {
    if (code) {
      addRecentView(code);
    }
  }, [code, addRecentView]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!stock) {
    return <Typography>Stock not found</Typography>;
  }

  return (
    <Container>
      <Header>
        <div>
          <Typography variant="title" level={2}>
            {stock.name}
          </Typography>
          <Typography variant="caption" style={{ color: '#666' }}>
            {stock.code}
          </Typography>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Typography
            variant="title"
            level={3}
            style={{
              color:
                stock.changePercent > 0
                  ? '#e23d29'
                  : stock.changePercent < 0
                    ? '#1e75d0'
                    : '#999999',
            }}
          >
            {stock.analysis[stock.analysis.length - 1].end.toLocaleString()}
          </Typography>
          <Typography
            variant="body"
            style={{
              color:
                stock.changePercent > 0
                  ? '#e23d29'
                  : stock.changePercent < 0
                    ? '#1e75d0'
                    : '#999999',
            }}
          >
            {stock.changePercent > 0 ? '▲' : stock.changePercent < 0 ? '▼' : '-'}{' '}
            {stock.absChangePercent > 0 && `${stock.absChangePercent.toFixed(2)}%`}
          </Typography>
        </div>
      </Header>

      <ChartSection>
        <StyledCard>
          <StockChart data={stock.analysis} />
        </StyledCard>
      </ChartSection>

      <NewsSection>
        <Typography variant="title" level={3} style={{ marginBottom: '16px' }}>
          News
        </Typography>
        {stock.news && stock.news.length > 0 ? (
          stock.news.map((item: any, index: number) => (
            <StyledCard
              key={index}
              style={{ marginBottom: '10px', padding: '16px', cursor: 'pointer' }}
              onClick={() => window.open(item.link, '_blank')}
            >
              <Typography
                variant="body"
                level={1}
                style={{ marginBottom: '8px', fontWeight: 'bold' }}
              >
                {item.title}
              </Typography>
              <Typography variant="body" style={{ fontSize: '12px', color: '#555' }}>
                {item.description.length > 200
                  ? item.description.substring(0, 200) + '...'
                  : item.description}
              </Typography>
            </StyledCard>
          ))
        ) : (
          <Typography>No news available.</Typography>
        )}
      </NewsSection>
    </Container>
  );
};
