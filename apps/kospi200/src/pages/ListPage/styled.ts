import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const LoadingContainer = styled.div`
  padding: 80px;
  text-align: center;
`;

export const SectionTitle = styled(Typography)`
  margin-bottom: 24px;
`;

/* New Pretty Layout Components */
export const TopStocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
`;

export const StockCard = styled.div`
  background: var(--imspdr-background-bg1);
  border: 1px solid var(--imspdr-background-bg3);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px var(--imspdr-shadow);
    border-color: var(--imspdr-primary-main);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--imspdr-primary-main);
    transition: height 0.3s ease;
  }

  &:hover::before {
    height: 100%;
  }
`;

interface RankBadgeProps {
  rank: number;
}

export const RankBadge = styled.div<RankBadgeProps>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  background: ${({ rank }) =>
    rank <= 3 ? 'var(--imspdr-primary-main)' : 'var(--imspdr-background-bg2)'};
  color: ${({ rank }) => (rank <= 3 ? 'white' : 'var(--imspdr-foreground-fg2)')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
`;

export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface ChangeLabelProps {
  isRising: boolean;
}

export const ChangeLabel = styled(Typography)<ChangeLabelProps>`
  color: ${({ isRising }) => (isRising ? '#ef4444' : '#3b82f6')};
  display: flex;
  align-items: center;
  gap: 4px;
`;
