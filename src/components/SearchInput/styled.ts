import styled from '@emotion/styled';

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px 36px 8px 12px;
  background: var(--imspdr-background-bg1);
  border: 1px solid var(--imspdr-background-bg3);
  border-radius: 6px;
  font-size: 14px;
  color: var(--imspdr-foreground-fg1);
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: var(--imspdr-mint-mint1);
    box-shadow: 0 0 0 2px var(--imspdr-mint-mint1_10);
  }

  &::placeholder {
    color: var(--imspdr-foreground-fg3);
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--imspdr-foreground-fg3);
  pointer-events: none;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 32px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--imspdr-foreground-fg3);
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: var(--imspdr-background-bg3);
    color: var(--imspdr-foreground-fg1);
  }
`;
