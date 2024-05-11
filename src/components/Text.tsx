/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

export interface TextPropsCustom extends TextProps {
  children: string;
}

const Text: React.FC<TextPropsCustom> = ({children, style, ...props}) => {
  return (
    <RNText style={[{fontFamily: 'DNFBitBitv2'}, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
