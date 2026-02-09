import { Button } from '../Button';
import styled from '@emotion/styled';
import { ToastProvider, useToast } from './ToastProvider';

const Stack = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '0px'};
`;

export default {
  title: 'Components/Toast',
  decorators: [
    (Story: any) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

const ToastTrigger = () => {
  const { showToast } = useToast();

  return (
    <Stack gap="10px">
      <Button onClick={() => showToast('기본 토스트 메시지입니다.')}>토스트 보이기</Button>
      <Button
        variant="outlined"
        onClick={() => showToast('여러 번 클릭하여 쌓이는 것을 확인하세요!')}
      >
        쌓이는 토스트 확인
      </Button>
    </Stack>
  );
};

export const Default = () => <ToastTrigger />;
