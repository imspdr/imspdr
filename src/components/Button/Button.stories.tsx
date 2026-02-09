import { Button } from './index';
import { HiPlus, HiArrowRight } from 'react-icons/hi';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button variant="contained" color="danger.1">Danger</Button>
      <Button variant="outlined" color="success.1">Success</Button>
      <Button variant="ghost" color="warning.1">Warning</Button>
    </div>
  </div>
);

export const Shapes = () => (
  <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
    <Button shape="square">Square</Button>
    <Button shape="rounded">Rounded (Default)</Button>
    <Button shape="pill">Pill</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '20px' }}>
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
    <Button isLoading>Loading</Button>
    <Button disabled>Disabled</Button>
    <Button leftIcon={<HiPlus />}>Left Icon</Button>
    <Button rightIcon={<HiArrowRight />}>Right Icon</Button>
  </div>
);

export const FullWidth = () => (
  <div style={{ width: '400px', padding: '20px' }}>
    <Button fullWidth variant="contained">Full Width Button</Button>
  </div>
);
