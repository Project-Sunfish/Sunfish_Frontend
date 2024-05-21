import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleProp, ViewStyle} from 'react-native';

type TempPointProps = {
  style?: StyleProp<ViewStyle>;
};

export default function TempPoint(props: TempPointProps) {
  return (
    <LottieView
      source={require('../../assets/animations/tempPoint.json')}
      autoPlay
      loop
      style={[{width: 200, height: 200}, props.style]}
    />
  );
}
