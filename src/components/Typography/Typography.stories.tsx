import { Typography } from './index';
import styled from '@emotion/styled';


const Stack = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '0px'};
`;

export default {
  title: 'Components/Typography',
  component: Typography,
};

export const Titles = () => (
  <Stack gap="16px">
    <Typography variant="title" level={1}>
      제목 레벨 1 (Roboto 32px)
    </Typography>
    <Typography variant="title" level={2}>
      제목 레벨 2 (Roboto 24px)
    </Typography>
    <Typography variant="title" level={3}>
      제목 레벨 3 (Roboto 20px)
    </Typography>
  </Stack>
);

export const Body = () => (
  <Stack gap="12px">
    <Typography variant="body" level={1}>
      본문 레벨 1 (Noto Sans 16px) - 한글 가나다라마바사
    </Typography>
    <Typography variant="body" level={2}>
      본문 레벨 2 (Noto Sans 14px) - 한글 가나다라마바사
    </Typography>
    <Typography variant="body" level={3}>
      본문 레벨 3 (Noto Sans 12px) - 한글 가나다라마바사
    </Typography>
  </Stack>
);

export const Caption = () => (
  <Stack gap="8px">
    <Typography variant="caption">캡션 텍스트 (Inter 12px) - 가나다라마바사</Typography>
    <div style={{ background: 'var(--imspdr-background-bg2)', padding: '10px' }}>
      <Typography variant="caption">배경 위에서의 캡션 테스트</Typography>
    </div>
  </Stack>
);

export const Mix = () => (
  <Stack gap="20px">
    <div>
      <Typography variant="title" level={2}>
        포트폴리오 요약
      </Typography>
      <Typography variant="body" level={1}>
        현재 KOSPI 200 지수의 흐름을 분석한 결과입니다.
      </Typography>
      <Typography variant="caption">업데이트 시간: 2026년 1월 1일</Typography>
    </div>
  </Stack>
);
