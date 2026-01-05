import React from 'react';
import { Typography } from '@imspdr/ui';
import * as S from './StockMiniCard.styled';

interface StockMiniCardProps {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  to_buy?: string[];
  isStarred: boolean;
  onToggleStar: (e: React.MouseEvent) => void;
  onClick: () => void;
  isFolded: boolean;
}

export const StockMiniCard: React.FC<StockMiniCardProps> = ({
  name,
  code,
  price,
  change,
  changePercent,
  to_buy = [],
  isStarred,
  onToggleStar,
  onClick,
  isFolded,
}) => {
  const isRising = change > 0;
  const hasBuySignal = to_buy.length > 0;

  if (isFolded) {
    return (
      <S.CardContainer isFolded onClick={onClick} title={name}>
        <S.FoldedIcon variant="title" level={3}>
          {name.substring(0, 1)}
        </S.FoldedIcon>
        {hasBuySignal && <S.SignalDot />}
      </S.CardContainer>
    );
  }

  return (
    <S.CardContainer onClick={onClick}>
      <S.TopRow>
        <S.NameSection>
          <S.StarButton
            isStarred={isStarred}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(e);
            }}
          >
            {isStarred ? '★' : '☆'}
          </S.StarButton>
          <S.StockName variant="body" level={2}>
            {name}
          </S.StockName>
        </S.NameSection>
        {hasBuySignal && (
          <S.SignalTag>
            <Typography variant="caption" style={{ fontSize: '10px', fontWeight: 700 }}>
              매수
            </Typography>
          </S.SignalTag>
        )}
      </S.TopRow>
      <S.BottomRow>
        <S.Price variant="body" level={2} style={{ fontWeight: 600 }}>
          {price.toLocaleString()}원
        </S.Price>
        <S.Change variant="caption" isRising={isRising} style={{ fontWeight: 500 }}>
          {isRising ? '▲' : '▼'}
          {Math.abs(change).toLocaleString()} ({changePercent.toFixed(1)}%)
        </S.Change>
      </S.BottomRow>
    </S.CardContainer>
  );
};
