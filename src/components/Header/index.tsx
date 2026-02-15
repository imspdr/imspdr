import { ReactNode } from 'react';
import { Button } from '../Button';
import { ThemeToggleButton } from '../ThemeToggleButton';
import { Typography } from '../Typography';
import { HeaderContainer, HeaderInner, MiddleSection, RightSection, TitleSection } from './styled';

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
      <HeaderInner>
        <TitleSection>
          <Button variant="text" onClick={handleHomeClick} style={{ padding: 0 }}>
            <Typography variant="title" level={2} bold>
              {title}
            </Typography>
          </Button>
        </TitleSection>
        <MiddleSection>{middleContent}</MiddleSection>
        <RightSection>
          {rightContent}
          <ThemeToggleButton />
        </RightSection>
      </HeaderInner>
    </HeaderContainer>
  );
};
