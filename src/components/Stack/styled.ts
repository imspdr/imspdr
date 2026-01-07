import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export interface StackProps {
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  gap?: CSSProperties['gap'];
  direction?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flexWrap?: CSSProperties['flexWrap'];
  flexBasis?: CSSProperties['flexBasis'];
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  alignContent?: CSSProperties['alignContent'];
  justifyItems?: CSSProperties['justifyItems'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const StyledStack = styled.div<StackProps>`
  display: flex;
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({ flexShrink }) => flexShrink && `flex-shrink: ${flexShrink};`}
  ${({ alignContent }) => alignContent && `align-content: ${alignContent};`}
  ${({ justifyItems }) => justifyItems && `justify-items: ${justifyItems};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
`;
