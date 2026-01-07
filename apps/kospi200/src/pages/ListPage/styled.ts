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

export const TopStocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
`;
