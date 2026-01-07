import { Button } from './index';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Box = () => (
  <div style={{ display: 'flex', gap: '10px' }}>
    <Button variant="box" onClick={() => alert('박스 버튼 클릭!')}>
      클릭해주세요 (박스)
    </Button>
    <Button variant="box" disabled>
      비활성화 버튼
    </Button>
  </div>
);

export const Outlined = () => (
  <div style={{ display: 'flex', gap: '10px' }}>
    <Button variant="outlined" onClick={() => alert('아웃라인 버튼 클릭!')}>
      클릭해주세요 (아웃라인)
    </Button>
    <Button variant="outlined" disabled>
      비활성화 아웃라인
    </Button>
  </div>
);

export const Comparison = () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <Button variant="box">박스형</Button>
    <Button variant="outlined">아웃라인형</Button>
  </div>
);
