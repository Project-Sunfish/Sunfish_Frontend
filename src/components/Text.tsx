/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  PixelRatio,
  Platform,
  Text as RNText,
  TextProps,
  useWindowDimensions,
} from 'react-native';

export interface TextPropsCustom extends TextProps {
  children: string | string[];
  smallFontSize?: number;
}

const Text: React.FC<TextPropsCustom> = ({
  children,
  style,
  smallFontSize,
  ...props
}) => {
  const fold5Width = 904;
  const fold5Height = 2176;
  const {width, height} = useWindowDimensions();
  const currentDPI = PixelRatio.get();
  const scaleFactor = currentDPI / PixelRatio.getFontScale();
  const adjustedWidth = width * scaleFactor;
  const adjustedHeight = height * scaleFactor;
  const isSmallScreen = adjustedWidth < fold5Width;

  let fontSizeStyle = {};
  if (typeof style === 'object' && style !== null && 'fontSize' in style) {
    fontSizeStyle =
      isSmallScreen && Platform.OS !== 'ios'
        ? {fontSize: (style.fontSize ?? 12) - 3}
        : {};
  }
  if (Array.isArray(style)) {
    for (let i = style.length - 1; i >= 0; i--) {
      if (
        typeof style[i] === 'object' &&
        style[i] !== null &&
        style[i] !== undefined &&
        'fontSize' in style[i]
      ) {
        fontSizeStyle =
          isSmallScreen && Platform.OS !== 'ios'
            ? {fontSize: (style[i].fontSize ?? 12) - 3}
            : {};
        break;
      }
    }
  }
  return (
    <RNText
      style={[{fontFamily: 'DNFBitBitv2'}, style, fontSizeStyle]}
      {...props}>
      {children}
    </RNText>
  );
};

export default Text;
