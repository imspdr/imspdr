import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  display: flex;
`;

interface MainContentProps {
  isFolded: boolean;
}

export const MainContent = styled.main<MainContentProps>`
  flex: 1;
  padding-top: 60px;
  margin-right: ${({ isFolded }) => (isFolded ? '60px' : '280px')};
  min-height: 100vh;
  background-color: var(--imspdr-background-bg2);
  transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
