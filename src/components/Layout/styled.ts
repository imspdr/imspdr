import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export interface MainContentProps {
  isFolded?: boolean;
  sidebarWidth?: number;
  tabBarWidth?: number;
}

export const MainContent = styled.main<MainContentProps>`
  flex: 1;
  height: calc(100vh - 60px);
  overflow-y: auto;
  margin-top: 60px;
  margin-right: ${({ isFolded = false, sidebarWidth = 320, tabBarWidth = 60 }) =>
    isFolded ? `${tabBarWidth}px` : `${sidebarWidth}px`};
  background-color: var(--imspdr-background-2);
  transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  @media (max-width: 1080px) {
    margin-right: ${({ tabBarWidth = 60 }) => `${tabBarWidth}px`};
  }

  @media (max-width: 767px) {
    margin-right: 0px;
    margin-top: 48px;
    height: calc(100vh - 48px);
  }
`;
