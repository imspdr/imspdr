import React, { useState } from 'react';
import { DropSelect } from './index';

export default {
  title: 'Components/DropSelect',
  component: DropSelect,
};

const mockOptions = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '체리', value: 'cherry' },
  { label: '대추', value: 'date' },
  { label: '딸기', value: 'strawberry' },
  { label: '무화과', value: 'fig' },
  { label: '포도', value: 'grape' },
  { label: '멜론', value: 'melon' },
];

export const Default = () => {
  const [selected, setSelected] = useState('');
  return (
    <div style={{ height: '300px' }}>
      <DropSelect 
        options={mockOptions} 
        selected={selected} 
        onSelect={setSelected} 
        placeholder="과일을 선택하세요..."
      />
      <div style={{ marginTop: '20px' }}>선택된 항목: {selected || '없음'}</div>
    </div>
  );
};

export const Searchable = () => {
  const [selected, setSelected] = useState('');
  return (
    <div style={{ height: '300px' }}>
      <DropSelect 
        searchable
        options={mockOptions} 
        selected={selected} 
        onSelect={setSelected} 
        placeholder="과일 검색하기..."
      />
      <div style={{ marginTop: '20px' }}>선택된 항목: {selected || '없음'}</div>
    </div>
  );
};

export const LongList = () => {
  const [selected, setSelected] = useState('');
  const manyOptions = Array.from({ length: 50 }, (_, i) => ({
    label: `옵션 ${i + 1}`,
    value: `opt-${i + 1}`,
  }));
  return (
    <div style={{ height: '300px' }}>
      <DropSelect 
        searchable
        options={manyOptions} 
        selected={selected} 
        onSelect={setSelected} 
        placeholder="여러 옵션 중 선택..."
      />
    </div>
  );
};
