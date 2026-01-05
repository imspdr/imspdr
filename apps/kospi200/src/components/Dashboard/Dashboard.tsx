import React, { useEffect, useMemo, useState } from 'react';
import { AutoComplete, Button, Stack, useTheme } from '@imspdr/ui';
import { useStocks } from '../../hooks/useKospiData';
import { Description, SignalBadge, Table, Td, Th, Title, Top10Label } from './styled';

interface DashboardProps {
  onStockSelect: (code: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStockSelect }) => {
  const { mode } = useTheme();
  const { data: stocks, isLoading, refetch } = useStocks();
  const [starredCodes, setStarredCodes] = useState<string[]>(() => {
    const saved = localStorage.getItem('kospi200_starred');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kospi200_starred', JSON.stringify(starredCodes));
  }, [starredCodes]);

  const toggleStar = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  };

  const processedStocks = useMemo(() => {
    if (!stocks) return [];
    return stocks.map((s) => ({
      ...s,
      changePercent: ((s.today - s.last) / s.last) * 100,
      absChangePercent: Math.abs((s.today - s.last) / s.last) * 100,
    }));
  }, [stocks]);

  const top10Stocks = useMemo(() => {
    return [...processedStocks]
      .sort((a, b) => b.absChangePercent - a.absChangePercent)
      .slice(0, 10);
  }, [processedStocks]);

  const starredStocksList = useMemo(() => {
    return processedStocks.filter((s) => starredCodes.includes(s.code));
  }, [processedStocks, starredCodes]);

  const searchOptions = useMemo(() => {
    return processedStocks.map((s) => ({
      label: s.name,
      subLabel: s.code,
      value: s.code,
    }));
  }, [processedStocks]);

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const renderStockRow = (stock: (typeof processedStocks)[0], isTop10: boolean) => {
    const isStarred = starredCodes.includes(stock.code);
    const isUp = stock.today >= stock.last;
    const color = isUp ? 'var(--imspdr-danger-danger1)' : 'var(--imspdr-primary-primary1)'; // Red for up (KR market), Blue for down

    return (
      <tr
        key={stock.code}
        onClick={() => onStockSelect(stock.code)}
        style={{ cursor: 'pointer', borderBottom: '1px solid var(--imspdr-background-bg3)' }}
      >
        <Td>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={(e) => toggleStar(stock.code, e)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: isStarred ? '#FFD700' : 'var(--imspdr-foreground-fg3)',
              }}
            >
              {isStarred ? '★' : '☆'}
            </button>
            {isTop10 && <Top10Label>TOP 10</Top10Label>}
            {stock.name}
          </div>
        </Td>
        <Td>{stock.code}</Td>
        <Td>{stock.today.toLocaleString()}원</Td>
        <Td style={{ color }}>
          {isUp ? '▲' : '▼'} {Math.abs(stock.today - stock.last).toLocaleString()} (
          {stock.changePercent.toFixed(2)}%)
        </Td>
        <Td>
          {stock.to_buy.length > 0
            ? stock.to_buy.map((signal) => <SignalBadge key={signal}>{signal}</SignalBadge>)
            : '-'}
        </Td>
      </tr>
    );
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Stack direction="column" gap="40px">
        {/* Search Bar */}
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <AutoComplete
            options={searchOptions}
            onSelect={(opt) => onStockSelect(opt.value)}
            placeholder="Search by stock name or code..."
          />
        </div>

        {/* Starred Stocks */}
        <div>
          <Title>Starred Stocks</Title>
          {starredStocksList.length === 0 ? (
            <Description>No starred stocks yet. Star stocks from the Top 10 list!</Description>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Code</Th>
                  <Th>Price</Th>
                  <Th>Change</Th>
                  <Th>Signals</Th>
                </tr>
              </thead>
              <tbody>{starredStocksList.map((s) => renderStockRow(s, false))}</tbody>
            </Table>
          )}
        </div>

        {/* Top 10 Stocks */}
        <div>
          <Title>Top 10 Movers</Title>
          <Description>Biggest price changes today.</Description>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Code</Th>
                <Th>Price</Th>
                <Th>Change</Th>
                <Th>Signals</Th>
              </tr>
            </thead>
            <tbody>{top10Stocks.map((s) => renderStockRow(s, true))}</tbody>
          </Table>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => refetch()}>Refresh Data</Button>
        </div>
      </Stack>
    </div>
  );
};

export default Dashboard;
