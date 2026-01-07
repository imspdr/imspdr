import { AutoComplete, AutoCompleteOption } from './index';

export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
};

const mockOptions: AutoCompleteOption[] = [
  { value: '005930', label: '삼성전자', subLabel: 'Samsung Electronics' },
  { value: '000660', label: 'SK하이닉스', subLabel: 'SK hynix' },
  { value: '207940', label: '삼성바이오로직스', subLabel: 'Samsung Biologics' },
  { value: '005490', label: 'POSCO홀딩스', subLabel: 'POSCO Holdings' },
  { value: '051910', label: 'LG화학', subLabel: 'LG Chem' },
  { value: '035420', label: 'NAVER', subLabel: 'Naver' },
  { value: '035720', label: '카카오', subLabel: 'Kakao' },
];

export const Default = () => {
  const handleSelect = (option: AutoCompleteOption) => {
    console.log('Selected:', option);
    alert(`선택되었습니다: ${option.label} (${option.value})`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <AutoComplete
        options={mockOptions}
        onSelect={handleSelect}
        placeholder="종목명을 입력하세요 (예: 삼성, 네이버)"
      />
    </div>
  );
};

export const WithInitialValue = () => {
  const handleSelect = (option: AutoCompleteOption) => {
    console.log('Selected:', option);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <AutoComplete
        options={mockOptions}
        onSelect={handleSelect}
        initialValue="삼성"
        placeholder="종목명을 입력하세요"
      />
    </div>
  );
};

export const NoResultsFound = () => {
  const handleSelect = (option: AutoCompleteOption) => {
    console.log('Selected:', option);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <AutoComplete
        options={[]}
        onSelect={handleSelect}
        placeholder="검색 결과가 없는 예시"
        noResultText="검색 결과가 없습니다."
      />
    </div>
  );
};
