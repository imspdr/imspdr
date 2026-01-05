import React, { useEffect, useRef, useState } from 'react';
import { isKoreanMatch } from '@imspdr/utils';
import { SearchInput } from '../SearchInput';
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
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  onSelect,
  placeholder = 'Search...',
  className,
  initialValue = '',
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
                  <div style={{ fontWeight: 500 }}>{option.label}</div>
                  {option.subLabel && (
                    <div style={{ fontSize: '12px', color: 'var(--imspdr-foreground-fg3)' }}>
                      {option.subLabel}
                    </div>
                  )}
                </OptionItem>
              ))}
            </OptionsList>
          ) : (
            <NoResults>No results found</NoResults>
          )}
        </Dropdown>
      )}
    </Container>
  );
};
