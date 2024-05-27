import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleProp, ViewStyle} from 'react-native';
type CursorProps = {
  style?: StyleProp<ViewStyle>;
};
export default function Cursor(props: CursorProps) {
  return (
    <LottieView
      source={require('../../assets/animations/cursor.json')}
      autoPlay
      loop
      style={[{width: 200, height: 200}, props.style]}
    />
  );
}
