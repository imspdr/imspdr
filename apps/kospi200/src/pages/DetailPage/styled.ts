import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
`;

export const LeftColumn = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;
  gap: 24px;

  /* Stylish scrollbar for news */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--imspdr-background-bg3);
    border-radius: 3px;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--imspdr-background-bg3);
`;

export const PriceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const NewsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const NewsItem = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid var(--imspdr-background-bg3);
  transition:
    padding-left 0.2s ease-in-out,
    transform 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    padding-left: 8px;
    background: var(--imspdr-mint-mint1_10);
    border-radius: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;
