import { useEffect, useState, FC, KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import { useDebounce } from '../../hooks/useDebounce';
import { ClearButton, IconWrapper, SearchWrapper, StyledInput } from './styled';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onEnter,
  placeholder = '검색하기',
  className,
  autoFocus,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    setInputValue('');
    onChange('');
  };

  return (
    <SearchWrapper className={className}>
      <StyledInput
        autoFocus={autoFocus}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {inputValue && (
        <ClearButton onClick={handleClear} type="button">
          <HiX size={14} />
        </ClearButton>
      )}
      <IconWrapper>
        <HiSearch size={16} />
      </IconWrapper>
    </SearchWrapper>
  );
};
