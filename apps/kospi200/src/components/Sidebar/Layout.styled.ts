import styled from '@emotion/styled';

export const MainContent = styled.main<{ isFolded: boolean }>`
  flex: 1;
  padding-top: 60px;
  margin-right: ${({ isFolded }) => (isFolded ? '60px' : '280px')};
  min-height: 100vh;
  background-color: var(--imspdr-background-bg2);
  transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
