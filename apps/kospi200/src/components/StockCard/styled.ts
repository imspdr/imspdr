import styled from '@emotion/styled';

export const CardContainer = styled.div`
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

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const NameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const StockName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--imspdr-foreground-fg1);
`;

export const StarButton = styled.button<{ isStarred: boolean }>`
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

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--imspdr-foreground-fg1);
`;

export const Change = styled.div<{ isRising: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ isRising }) => (isRising ? '#ef4444' : '#3b82f6')};
`;

export const SignalsSection = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const SignalBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  margin: 2px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  background: var(--imspdr-primary-main);
  color: white;
`;

export const Top10Label = styled.span`
  display: inline-block;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  background: var(--imspdr-secondary-main);
  color: white;
  margin-right: 4px;
`;
