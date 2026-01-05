import React from 'react';
import styled from '@emotion/styled';
import { SignalBadge, Top10Label } from '../Dashboard/styled';

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

const CardContainer = styled.div`
  background: var(--imspdr-card-card1);
  border: 1px solid var(--imspdr-background-bg3);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px var(--imspdr-shadow);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const NameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const StockName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--imspdr-foreground-fg1);
`;

const StarButton = styled.button<{ isStarred: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ isStarred }) => (isStarred ? '#FFD700' : 'var(--imspdr-foreground-fg3)')};
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--imspdr-foreground-fg1);
`;

const Change = styled.div<{ isRising: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ isRising }) => (isRising ? '#ef4444' : '#3b82f6')};
`;

const SignalsSection = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const StockCard: React.FC<StockCardProps> = ({
  name,
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
