import { Stack } from './index';

export default {
  title: 'Components/Stack',
  component: Stack,
};

export const Column = () => (
  <Stack direction="column" gap="10px">
    <div style={{ padding: '10px', background: '#f0f0f0' }}>Item 1</div>
    <div style={{ padding: '10px', background: '#f0f0f0' }}>Item 2</div>
    <div style={{ padding: '10px', background: '#f0f0f0' }}>Item 3</div>
  </Stack>
);

export const Row = () => (
  <Stack direction="row" gap="20px">
    <div style={{ padding: '10px', background: '#f0f0f0' }}>Item 1</div>
    <div style={{ padding: '10px', background: '#f0f0f0' }}>Item 2</div>
    <div style={{ padding: '10px', background: '#f0f0f0' }}>Item 3</div>
  </Stack>
);

export const Nested = () => (
  <Stack direction="column" gap="20px">
    <Stack direction="row" gap="10px">
      <div style={{ padding: '10px', background: '#f0f0f0' }}>Row 1-1</div>
      <div style={{ padding: '10px', background: '#f0f0f0' }}>Row 1-2</div>
    </Stack>
    <Stack direction="row" gap="10px">
      <div style={{ padding: '10px', background: '#f0f0f0' }}>Row 2-1</div>
      <div style={{ padding: '10px', background: '#f0f0f0' }}>Row 2-2</div>
    </Stack>
  </Stack>
);
