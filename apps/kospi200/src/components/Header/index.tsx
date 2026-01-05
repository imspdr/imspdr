import React from 'react';
import { ThemeToggleButton } from '@imspdr/ui';
import { HeaderContainer, RightSection, TitleButton } from './styled';

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <HeaderContainer>
      <TitleButton onClick={handleHomeClick}>kospi200</TitleButton>
      <RightSection>
        <ThemeToggleButton />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
