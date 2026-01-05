import React from 'react';
import {
  CardContainer,
  CardHeader,
  Change,
  NameSection,
  Price,
  PriceSection,
  SignalBadge,
  SignalsSection,
  StarButton,
  StockName,
  Top10Label,
} from './styled';

interface StockCardProps {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  signals: string[];
  isStarred: boolean;
  isTop10: boolean;
  onToggleStar: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({
  name,
  code,
  price,
  change,
  changePercent,
  signals,
  isStarred,
  isTop10,
  onToggleStar,
  onClick,
}) => {
  const isRising = change >= 0;

  return (
    <CardContainer onClick={onClick}>
      <CardHeader>
        <NameSection>
          <StarButton isStarred={isStarred} onClick={onToggleStar}>
            {isStarred ? '★' : '☆'}
          </StarButton>
          {isTop10 && <Top10Label>TOP 10</Top10Label>}
          <StockName>{name}</StockName>
        </NameSection>
        <PriceSection>
          <Price>{price.toLocaleString()}원</Price>
          <Change isRising={isRising}>
            {isRising ? '▲' : '▼'} {Math.abs(change).toLocaleString()} ({changePercent.toFixed(2)}%)
          </Change>
        </PriceSection>
      </CardHeader>
      {signals.length > 0 && (
        <SignalsSection>
          {signals.map((signal) => (
            <SignalBadge key={signal}>{signal}</SignalBadge>
          ))}
        </SignalsSection>
      )}
    </CardContainer>
  );
};
