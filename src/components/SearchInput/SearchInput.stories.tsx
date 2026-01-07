import React, { useState } from 'react';
import { SearchInput } from './index';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: '20px', maxWidth: '300px' }}>
      <SearchInput 
        value={value} 
        onChange={setValue} 
        onEnter={() => alert(`검색어: ${value}`)}
        placeholder="검색어를 입력하세요..."
      />
      <div style={{ marginTop: '10px' }}>입력값: {value}</div>
    </div>
  );
};

export const AutoFocus = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: '20px', maxWidth: '300px' }}>
      <SearchInput 
        autoFocus
        value={value} 
        onChange={setValue} 
        placeholder="자동 포커스 검색창"
      />
    </div>
  );
};
