import { ReactNode } from 'react';
import { Header } from '../Header';
import { LayoutContainer, MainContent, MainContentProps } from './styled';

interface LayoutProps extends MainContentProps {
  children: ReactNode;
  className?: string; // For additional styling if needed
  title: string;
  middleContent?: ReactNode;
  rightContent?: ReactNode;
  onHomeClick?: () => void;
  sidebar?: ReactNode;
}

export const Layout = ({
  children,
  className,
  title,
  middleContent,
  rightContent,
  onHomeClick,
  sidebar,
  ...props
}: LayoutProps) => {
  return (
    <LayoutContainer className={className}>
      <Header
        title={title}
        middleContent={middleContent}
        rightContent={rightContent}
        onHomeClick={onHomeClick}
      />
      <MainContent {...props}>{children}</MainContent>
      {sidebar}
    </LayoutContainer>
  );
};

export { LayoutContainer, MainContent }; // Export indivudally as well if user wants strict control
