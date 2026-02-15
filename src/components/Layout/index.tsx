import { ReactNode } from 'react';
import { Header } from '../Header';
import { LayoutContainer, MainContent } from './styled';

interface LayoutProps {
  children: ReactNode;
  className?: string; // For additional styling if needed
  title: string;
  middleContent?: ReactNode;
  rightContent?: ReactNode;
  onHomeClick?: () => void;
}

export const Layout = ({
  children,
  className,
  title,
  middleContent,
  rightContent,
  onHomeClick,
}: LayoutProps) => {
  return (
    <LayoutContainer className={className}>
      <Header
        title={title}
        middleContent={middleContent}
        rightContent={rightContent}
        onHomeClick={onHomeClick}
      />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export { LayoutContainer, MainContent }; // Export indivudally as well if user wants strict control
