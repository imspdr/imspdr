import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const PageContainer = styled.div`
  margin: 0 auto;
  padding: 24px;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;
`;

export const LoadingContainer = styled.div`
  padding: 80px;
  text-align: center;
`;

export const SectionTitle = styled(Typography)`
  margin-bottom: 12px;
`;

export const FlexColumn = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StockGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 8px;
  gap: 16px;
  overflow-y: auto;
  flex: 1;

  & > * {
    flex: 1 1 300px;
  }
`;

export const CompactStockList = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  gap: 8px;
  background: var(--imspdr-background-bg1);
  border: 1px solid var(--imspdr-background-bg3);
  border-radius: 16px;
  padding: 12px;
`;

export const CompactStockItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
  gap: 12px;

  &:hover {
    background: var(--imspdr-mint-mint1_10);
  }
`;

export const RankNumber = styled.span<{ rank: number }>`
  font-weight: 800;
  font-size: 14px;
  min-width: 20px;
  color: ${({ rank }) => (rank <= 3 ? 'var(--imspdr-mint-mint1)' : 'var(--imspdr-foreground-fg3)')};
`;

export const CompactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
