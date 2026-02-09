import { Typography } from './index';
import styled from '@emotion/styled';

const Stack = styled.div<{ gap?: string; direction?: 'column' | 'row' }>`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  gap: ${props => props.gap || '16px'};
  padding: 20px;
`;

export default {
  title: 'Components/Typography',
  component: Typography,
};

export const Titles = () => (
  <Stack>
    <Typography variant="title" level={1}>Title Level 1 (40px)</Typography>
    <Typography variant="title" level={2}>Title Level 2 (32px)</Typography>
    <Typography variant="title" level={3}>Title Level 3 (28px)</Typography>
    <Typography variant="title" level={4}>Title Level 4 (24px)</Typography>
    <Typography variant="title" level={5}>Title Level 5 (20px)</Typography>
    <Typography variant="title" level={6}>Title Level 6 (18px)</Typography>
  </Stack>
);

export const BoldOptions = () => (
  <Stack>
    <Typography variant="body" level={1}>Normal Body Text</Typography>
    <Typography variant="body" level={1} bold>Bold Body Text</Typography>
    <Typography variant="caption" level={1}>Normal Caption Text</Typography>
    <Typography variant="caption" level={1} bold>Bold Caption Text</Typography>
    <Typography variant="title" level={4}>Normal Title Text (Level 4)</Typography>
    <Typography variant="title" level={4} bold>Bold Title Text (Level 4)</Typography>
  </Stack>
);

export const BodyAndCaption = () => (
  <Stack>
    <Typography variant="body" level={1}>Body Level 1 (16px) - The quick brown fox jumps over the lazy dog.</Typography>
    <Typography variant="body" level={2}>Body Level 2 (14px) - The quick brown fox jumps over the lazy dog.</Typography>
    <Typography variant="body" level={3}>Body Level 3 (13px) - The quick brown fox jumps over the lazy dog.</Typography>
    <hr style={{ width: '100%', border: 'none', borderTop: '1px solid var(--imspdr-background-3)' }} />
    <Typography variant="caption" level={1}>Caption Level 1 (12px)</Typography>
    <Typography variant="caption" level={2}>Caption Level 2 (11px)</Typography>
  </Stack>
);

export const Colors = () => (
  <Stack>
    <Typography variant="title" level={4} color="primary.1">Primary Color (Action)</Typography>
    <Typography variant="title" level={4} color="success.1">Success Color (Positive)</Typography>
    <Typography variant="title" level={4} color="warning.1">Warning Color (Caution)</Typography>
    <Typography variant="title" level={4} color="danger.1">Danger Color (Error)</Typography>
    <Typography variant="title" level={4} color="info.1">Info Color (Information)</Typography>
    <Typography variant="title" level={4} color="content.2">Content Color 2 (Secondary Text)</Typography>
    <Typography variant="title" level={4} color="content.3">Content Color 3 (Disabled/Hint Text)</Typography>
  </Stack>
);

export const Composition = () => (
  <Stack gap="24px">
    <div>
      <Typography variant="title" level={2} color="primary.1">Project Dashboard</Typography>
      <Typography variant="body" level={2} color="content.2">
        Manage your tasks and track progress efficiently.
      </Typography>
    </div>

    <div style={{ backgroundColor: 'var(--imspdr-background-2)', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="title" level={4} color="danger.1">Attention Required</Typography>
      <Typography variant="body" level={2}>
        You have 3 tasks that are overdue. Please review them as soon as possible.
      </Typography>
      <Typography variant="caption" level={1} color="content.3">Updated 5 minutes ago</Typography>
    </div>

    <Stack direction="row" gap="12px">
      <Typography variant="caption" level={1} color="success.1">● Online</Typography>
      <Typography variant="caption" level={1} color="content.2">System status is normal</Typography>
    </Stack>
  </Stack>
);
