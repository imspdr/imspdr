import { Button } from '../Button';
import { Typography } from '../Typography';
import { ModalProvider, useModal } from './ModalProvider';

export default {
  title: 'Components/Modal',
  decorators: [
    (Story: any) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
};

const ChainedModalDemo = () => {
  const { openModal, closeModal } = useModal();

  const openSecondModal = () => {
    openModal(
      <Typography variant="body">이것은 첫 번째 모달 위에 열린 두 번째 모달입니다.</Typography>,
      {
        title: '두 번째 모달',
        footer: <Button onClick={() => closeModal()}>이 모달 닫기</Button>,
      },
    );
  };

  const openFirstModal = () => {
    openModal(
      <Typography variant="body">여기서 버튼을 눌러 또 다른 모달을 열 수 있습니다.</Typography>,
      {
        title: '첫 번째 모달',
        footer: (
          <>
            <Button variant="outlined" onClick={() => closeModal()}>
              취소
            </Button>
            <Button onClick={openSecondModal}>다음 모달</Button>
          </>
        ),
      },
    );
  };

  return <Button onClick={openFirstModal}>모달 체이닝 시작</Button>;
};

export const Default = () => <ChainedModalDemo />;
