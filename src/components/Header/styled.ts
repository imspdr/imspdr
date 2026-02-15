import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--imspdr-background-1);
  border-bottom: 1px solid var(--imspdr-background-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  box-sizing: border-box;

  @media (max-width: 767px) {
    height: 48px;
    padding: 0 12px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

// TitleButton removed

export const MiddleSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 16px;
`;
