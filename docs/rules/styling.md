# Styling and Component Rules

## 1. No Inline Styles

All styling must be done using Emotion's `styled` components. Using the `style={{ ... }}` prop is strictly prohibited in functional components.

## 2. Dedicated Styling Files

Every component that requires styling must have a companion `styled.ts` file in the same directory.

- Path: `src/components/[ComponentName]/styled.ts`

## 3. UI Component Usage

- **Prefer Library Components**: If a component exists in `@imspdr/ui` (e.g., `Button`, `Stack`, `AutoComplete`), it **must** be used instead of raw HTML elements or custom implementations.
- **Mandatory Typography**: All text elements must be wrapped in the `Typography` component from `@imspdr/ui`. Using raw `div`, `span`, `p`, or heading tags for text is not allowed.

## Example

**Correct:**

```typescript
import { Typography, Stack } from '@imspdr/ui';
import * as S from './styled';

export const MyComponent = () => (
  <S.Container>
    <Stack gap="8px">
      <Typography variant="title" level={1}>Hello World</Typography>
      <Typography variant="body" level={1}>This is a standardized text.</Typography>
    </Stack>
  </S.Container>
);
```

**Incorrect:**

```tsx
export const MyComponent = () => (
  <div className="container">
    <h1>Hello World</h1>
    <p>This is NOT standardized text.</p>
  </div>
);
```
