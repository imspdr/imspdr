import styled from '@emotion/styled';

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px 60px 8px 12px;
  background: var(--imspdr-background-1);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 6px;
  font-size: 14px;
  color: var(--imspdr-foreground-1);
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: var(--imspdr-primary-1);
    box-shadow: 0 0 0 2px var(--imspdr-primary-1_10);
  }

  &::placeholder {
    color: var(--imspdr-foreground-3);
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--imspdr-foreground-3);
  pointer-events: none;
  z-index: 1;
`;

// ClearButton removed
