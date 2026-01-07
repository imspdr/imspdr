import { useEffect, useRef, useState, FC } from 'react';
import { isKoreanMatch } from '@imspdr/utils';
import { SearchInput } from '../SearchInput';
import { Typography } from '../Typography';
import { Container, Dropdown, NoResults, OptionItem, OptionsList } from './styled';

export interface AutoCompleteOption {
  value: string;
  label: string;
  subLabel?: string;
}

interface AutoCompleteProps {
  options: AutoCompleteOption[];
  onSelect: (option: AutoCompleteOption) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
  noResultText?: string;
}

export const AutoComplete: FC<AutoCompleteProps> = ({
  options,
  onSelect,
  placeholder = 'Search...',
  className,
  initialValue = '',
  noResultText = 'No results found',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      isKoreanMatch(option.label, searchTerm) ||
      (option.subLabel && isKoreanMatch(option.subLabel, searchTerm)),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setIsOpen(true);
  };

  const handleSelect = (option: AutoCompleteOption) => {
    setSearchTerm(option.label);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef} className={className}>
      <SearchInput
        value={searchTerm}
        onChange={(val) => {
          handleSearch(val);
          if (!val) setIsOpen(false);
        }}
        placeholder={placeholder}
      />
      {isOpen && searchTerm && (
        <Dropdown>
          {filteredOptions.length > 0 ? (
            <OptionsList>
              {filteredOptions.map((option) => (
                <OptionItem key={option.value} onClick={() => handleSelect(option)}>
                  <Typography variant="body" level={2}>
                    {option.label}
                  </Typography>
                  {option.subLabel && (
                    <Typography variant="caption" level={3}>
                      {option.subLabel}
                    </Typography>
                  )}
                </OptionItem>
              ))}
            </OptionsList>
          ) : (
            <NoResults>
              <Typography variant="body" level={2}>
                {noResultText}
              </Typography>
            </NoResults>
          )}
        </Dropdown>
      )}
    </Container>
  );
};
