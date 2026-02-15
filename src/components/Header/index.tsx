import { ReactNode } from 'react';
import { ThemeToggleButton } from '../ThemeToggleButton';
import { Typography } from '../Typography';
import { HeaderContainer, MiddleSection, RightSection, TitleButton, TitleSection } from './styled';

interface HeaderProps {
  title: string;
  middleContent?: ReactNode;
  rightContent?: ReactNode;
  onHomeClick?: () => void;
}

export const Header = ({ title, middleContent, rightContent, onHomeClick }: HeaderProps) => {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <HeaderContainer>
      <TitleSection>
        <TitleButton onClick={handleHomeClick}>
          <Typography variant="title" level={2} bold>
            {title}
          </Typography>
        </TitleButton>
      </TitleSection>
      <MiddleSection>{middleContent}</MiddleSection>
      <RightSection>
        {rightContent}
        <ThemeToggleButton />
      </RightSection>
    </HeaderContainer>
  );
};
