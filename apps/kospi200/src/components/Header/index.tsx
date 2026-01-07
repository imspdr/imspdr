import { AutoComplete, ThemeToggleButton, Typography } from '@imspdr/ui';
import { HeaderContainer, RightSection, SearchWrapper, TitleButton, TitleSection } from './styled';

interface HeaderProps {
  onHomeClick?: () => void;
  searchOptions?: any[];
  onSearchSelect?: (option: any) => void;
  searchPlaceholder?: string;
}

const Header = ({
  onHomeClick,
  searchOptions = [],
  onSearchSelect,
  searchPlaceholder = '종목명 또는 코드로 검색',
}: HeaderProps) => {
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
          <Typography variant="title" level={2}>
            KOSPI200
          </Typography>
        </TitleButton>
        {onSearchSelect && (
          <SearchWrapper>
            <AutoComplete
              options={searchOptions}
              onSelect={onSearchSelect}
              placeholder={searchPlaceholder}
            />
          </SearchWrapper>
        )}
      </TitleSection>
      <RightSection>
        <ThemeToggleButton />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
