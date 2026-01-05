import { Card } from '@imspdr/ui';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ChartSection = styled.div`
  margin-bottom: 32px;
`;

export const NewsSection = styled.div`
  margin-top: 24px;
`;

export const StyledCard = styled(Card)`
  background: white;
  transition: transform 0.2s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
