
import { Header } from './index';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { HiSearch, HiMenu } from 'react-icons/hi';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Desktop = () => (
  <Header
    title="TESTTITLE"
    middleContent={
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Typography variant="body" level={2} style={{ cursor: 'pointer' }}>
          Menu 1
        </Typography>
        <Typography variant="body" level={2} style={{ cursor: 'pointer' }}>
          Menu 2
        </Typography>
        <Typography variant="body" level={2} style={{ cursor: 'pointer' }}>
          Menu 3
        </Typography>
      </div>
    }
    rightContent={
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Button variant="ghost" leftIcon={<HiSearch />}>
          Search
        </Button>
        <Button variant="contained" size="sm">
          Login
        </Button>
      </div>
    }
    onHomeClick={() => console.log('Home clicked')}
  />
);

export const Mobile = () => (
  <Header
    title="Mobile Page"
    rightContent={<Button variant="ghost" leftIcon={<HiMenu />} />}
    onHomeClick={() => console.log('Home clicked')}
  />
);

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
