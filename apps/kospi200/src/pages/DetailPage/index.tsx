import { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { StockChart } from '../../components/StockChart';
import { useStockDetail } from '../../hooks/useKospiData';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import {
  Container,
  Header,
  LeftColumn,
  NewsItem,
  NewsSection,
  PriceSummary,
  RightColumn,
} from './styled';

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

  const lastAnalysis = stock.analysis[stock.analysis.length - 1];
  const prevAnalysis = stock.analysis[stock.analysis.length - 2];

  const todayPrice = stock.today || lastAnalysis.end;
  const lastPrice = stock.last || prevAnalysis.end;
  const changePercent = ((todayPrice - lastPrice) / lastPrice) * 100;
  const absChangePercent = Math.abs(changePercent);

  return (
    <Container>
      <LeftColumn>
        <Header>
          <div>
            <Typography variant="title" level={2}>
              {stock.name}
            </Typography>
            <Typography variant="caption" style={{ color: '#666' }}>
              {stock.code}
            </Typography>
          </div>
          <PriceSummary>
            <Typography
              variant="title"
              level={1}
              style={{
                color: changePercent > 0 ? '#e23d29' : changePercent < 0 ? '#1e75d0' : '#999999',
              }}
            >
              {todayPrice.toLocaleString()}
            </Typography>
            <Typography
              variant="body"
              level={1}
              style={{
                color: changePercent > 0 ? '#e23d29' : changePercent < 0 ? '#1e75d0' : '#999999',
                fontWeight: 600,
              }}
            >
              {changePercent > 0 ? '▲' : changePercent < 0 ? '▼' : '-'}{' '}
              {absChangePercent !== 0 && `${absChangePercent.toFixed(2)}%`}
            </Typography>
          </PriceSummary>
        </Header>

        <NewsSection>
          {stock.news && stock.news.length > 0 ? (
            stock.news.map((item: any, index: number) => (
              <NewsItem key={index} onClick={() => window.open(item.link, '_blank')}>
                <Typography
                  variant="body"
                  level={2}
                  style={{ marginBottom: '8px', fontWeight: 'bold', lineHeight: 1.4 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body"
                  level={2}
                  style={{ fontSize: '12px', color: '#666', lineHeight: 1.5 }}
                >
                  {item.description.length > 150
                    ? item.description.substring(0, 150) + '...'
                    : item.description}
                </Typography>
              </NewsItem>
            ))
          ) : (
            <Typography variant="body" level={2} style={{ color: '#999' }}>
              뉴스가 없습니다.
            </Typography>
          )}
        </NewsSection>
      </LeftColumn>

      <RightColumn>
        <StockChart data={stock.analysis} />
      </RightColumn>
    </Container>
  );
};
