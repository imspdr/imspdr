import React from 'react';
import * as S from './styled';

export interface Stock {
  name: string;
  code: string;
  today: number;
  last: number;
  to_buy?: string[];
}

interface StockTableProps {
  stocks: Stock[];
  onStockClick: (code: string) => void;
  onToggleStar: (code: string) => void;
  isStarred: (code: string) => boolean;
  maxHeight?: string;
  emptyMessage?: string;
}

export const StockTable: React.FC<StockTableProps> = ({
  stocks,
  onStockClick,
  onToggleStar,
  isStarred,
  maxHeight,
  emptyMessage = '데이터가 없습니다.',
}) => {
  if (!stocks || stocks.length === 0) {
    return (
      <S.TableContainer maxHeight={maxHeight}>
        <S.EmptyState>{emptyMessage}</S.EmptyState>
      </S.TableContainer>
    );
  }

  return (
    <S.TableContainer maxHeight={maxHeight}>
      <S.Table>
        <thead>
          <tr>
            <S.Th>종목</S.Th>
            <S.Th>현재가</S.Th>
            <S.Th>대비</S.Th>
            <S.Th>신호</S.Th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const isRising = stock.today > stock.last;
            const change = stock.today - stock.last;
            const changePercent = (change / stock.last) * 100;

            return (
              <S.Tr key={stock.code} onClick={() => onStockClick(stock.code)}>
                <S.Td>
                  <S.StockNameWrapper>
                    <S.StarButton
                      isStarred={isStarred(stock.code)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(stock.code);
                      }}
                    >
                      {isStarred(stock.code) ? '★' : '☆'}
                    </S.StarButton>
                    {stock.name}
                  </S.StockNameWrapper>
                </S.Td>
                <S.Td>{stock.today.toLocaleString()}원</S.Td>
                <S.Td>
                  <S.Change isRising={isRising}>
                    {isRising ? '▲' : '▼'}
                    {Math.abs(change).toLocaleString()} ({changePercent.toFixed(1)}%)
                  </S.Change>
                </S.Td>
                <S.Td>
                  {stock.to_buy?.map((signal, idx) => (
                    <S.SignalBadge key={idx}>{signal}</S.SignalBadge>
                  ))}
                </S.Td>
              </S.Tr>
            );
          })}
        </tbody>
      </S.Table>
    </S.TableContainer>
  );
};
