import { Button, Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled(Typography)`
  color: var(--imspdr-foreground-fg1);
`;

export const CodeInfo = styled(Typography)`
  color: var(--imspdr-foreground-fg2);
`;

export const Description = styled(Typography)`
  color: var(--imspdr-foreground-fg3);
  line-height: 1.6;
`;

export const StyledButton = styled(Button)`
  align-self: flex-start;
  margin-top: 16px;
`;
