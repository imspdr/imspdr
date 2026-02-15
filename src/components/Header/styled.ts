import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--imspdr-background-1);
  border-bottom: 1px solid var(--imspdr-background-3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  z-index: 1000;

  @media (max-width: 767px) {
    height: 48px;
  }
`;

export const HeaderInner = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 0 0 0 6px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 767px) {
    gap: 12px;
    
    h1, h2, h3, h4, h5, h6 {
      font-size: 1.125rem !important;
    }
  }
`;

// TitleButton removed

export const MiddleSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;

  @media (max-width: 767px) {
    padding: 0 4px;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 16px;

  @media (max-width: 767px) {
    gap: 8px;
    margin-left: 4px;
  }
`;
