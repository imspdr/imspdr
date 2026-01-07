import { FC, ReactNode, HTMLAttributes } from 'react';
import { StyledStack, StackProps } from './styled';

export interface Props extends StackProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Stack: FC<Props> = ({ children, ...props }) => {
  return <StyledStack {...props}>{children}</StyledStack>;
};
