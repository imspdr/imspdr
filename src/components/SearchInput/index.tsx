import { useEffect, useState, FC, KeyboardEvent, ChangeEvent, MouseEvent, useRef } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import { Button } from '../Button';
import { useDebounce } from '../../hooks/useDebounce';
import { IconWrapper, SearchWrapper, StyledInput } from './styled';

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
  const inputRef = useRef<HTMLInputElement>(null);

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
    inputRef.current?.focus();
  };

  return (
    <SearchWrapper className={className}>
      <StyledInput
        ref={inputRef}
        autoFocus={autoFocus}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="xs"
          color="foreground.3"
          onClick={handleClear}
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          style={{ position: 'absolute', right: '32px', zIndex: 2, borderRadius: '50%', padding: '6px' }}
        >
          <HiX size={14} />
        </Button>
      )}
      <IconWrapper>
        <HiSearch size={16} />
      </IconWrapper>
    </SearchWrapper>
  );
};
